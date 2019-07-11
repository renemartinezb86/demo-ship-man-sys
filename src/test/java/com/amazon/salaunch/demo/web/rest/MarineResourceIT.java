package com.amazon.salaunch.demo.web.rest;

import com.amazon.salaunch.demo.ShipManagementSystemApp;
import com.amazon.salaunch.demo.domain.Marine;
import com.amazon.salaunch.demo.repository.MarineRepository;
import com.amazon.salaunch.demo.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.amazon.salaunch.demo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link MarineResource} REST controller.
 */
@SpringBootTest(classes = ShipManagementSystemApp.class)
public class MarineResourceIT {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final Instant DEFAULT_HIRE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HIRE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_RANK = 1L;
    private static final Long UPDATED_RANK = 2L;

    @Autowired
    private MarineRepository marineRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restMarineMockMvc;

    private Marine marine;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MarineResource marineResource = new MarineResource(marineRepository);
        this.restMarineMockMvc = MockMvcBuilders.standaloneSetup(marineResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Marine createEntity() {
        Marine marine = new Marine()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .email(DEFAULT_EMAIL)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .hireDate(DEFAULT_HIRE_DATE)
            .rank(DEFAULT_RANK);
        return marine;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Marine createUpdatedEntity() {
        Marine marine = new Marine()
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .hireDate(UPDATED_HIRE_DATE)
            .rank(UPDATED_RANK);
        return marine;
    }

    @BeforeEach
    public void initTest() {
        marineRepository.deleteAll();
        marine = createEntity();
    }

    @Test
    public void createMarine() throws Exception {
        int databaseSizeBeforeCreate = marineRepository.findAll().size();

        // Create the Marine
        restMarineMockMvc.perform(post("/api/marines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(marine)))
            .andExpect(status().isCreated());

        // Validate the Marine in the database
        List<Marine> marineList = marineRepository.findAll();
        assertThat(marineList).hasSize(databaseSizeBeforeCreate + 1);
        Marine testMarine = marineList.get(marineList.size() - 1);
        assertThat(testMarine.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testMarine.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testMarine.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testMarine.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testMarine.getHireDate()).isEqualTo(DEFAULT_HIRE_DATE);
        assertThat(testMarine.getRank()).isEqualTo(DEFAULT_RANK);
    }

    @Test
    public void createMarineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = marineRepository.findAll().size();

        // Create the Marine with an existing ID
        marine.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restMarineMockMvc.perform(post("/api/marines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(marine)))
            .andExpect(status().isBadRequest());

        // Validate the Marine in the database
        List<Marine> marineList = marineRepository.findAll();
        assertThat(marineList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllMarines() throws Exception {
        // Initialize the database
        marineRepository.save(marine);

        // Get all the marineList
        restMarineMockMvc.perform(get("/api/marines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(marine.getId())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].hireDate").value(hasItem(DEFAULT_HIRE_DATE.toString())))
            .andExpect(jsonPath("$.[*].rank").value(hasItem(DEFAULT_RANK.intValue())));
    }
    
    @Test
    public void getMarine() throws Exception {
        // Initialize the database
        marineRepository.save(marine);

        // Get the marine
        restMarineMockMvc.perform(get("/api/marines/{id}", marine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(marine.getId()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER.toString()))
            .andExpect(jsonPath("$.hireDate").value(DEFAULT_HIRE_DATE.toString()))
            .andExpect(jsonPath("$.rank").value(DEFAULT_RANK.intValue()));
    }

    @Test
    public void getNonExistingMarine() throws Exception {
        // Get the marine
        restMarineMockMvc.perform(get("/api/marines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateMarine() throws Exception {
        // Initialize the database
        marineRepository.save(marine);

        int databaseSizeBeforeUpdate = marineRepository.findAll().size();

        // Update the marine
        Marine updatedMarine = marineRepository.findById(marine.getId()).get();
        updatedMarine
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .hireDate(UPDATED_HIRE_DATE)
            .rank(UPDATED_RANK);

        restMarineMockMvc.perform(put("/api/marines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMarine)))
            .andExpect(status().isOk());

        // Validate the Marine in the database
        List<Marine> marineList = marineRepository.findAll();
        assertThat(marineList).hasSize(databaseSizeBeforeUpdate);
        Marine testMarine = marineList.get(marineList.size() - 1);
        assertThat(testMarine.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testMarine.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testMarine.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testMarine.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testMarine.getHireDate()).isEqualTo(UPDATED_HIRE_DATE);
        assertThat(testMarine.getRank()).isEqualTo(UPDATED_RANK);
    }

    @Test
    public void updateNonExistingMarine() throws Exception {
        int databaseSizeBeforeUpdate = marineRepository.findAll().size();

        // Create the Marine

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMarineMockMvc.perform(put("/api/marines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(marine)))
            .andExpect(status().isBadRequest());

        // Validate the Marine in the database
        List<Marine> marineList = marineRepository.findAll();
        assertThat(marineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteMarine() throws Exception {
        // Initialize the database
        marineRepository.save(marine);

        int databaseSizeBeforeDelete = marineRepository.findAll().size();

        // Delete the marine
        restMarineMockMvc.perform(delete("/api/marines/{id}", marine.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Marine> marineList = marineRepository.findAll();
        assertThat(marineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Marine.class);
        Marine marine1 = new Marine();
        marine1.setId("id1");
        Marine marine2 = new Marine();
        marine2.setId(marine1.getId());
        assertThat(marine1).isEqualTo(marine2);
        marine2.setId("id2");
        assertThat(marine1).isNotEqualTo(marine2);
        marine1.setId(null);
        assertThat(marine1).isNotEqualTo(marine2);
    }
}
