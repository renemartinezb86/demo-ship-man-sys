package com.amazon.salaunch.demo.web.rest;

import com.amazon.salaunch.demo.ShipManagementSystemApp;
import com.amazon.salaunch.demo.domain.Continent;
import com.amazon.salaunch.demo.repository.ContinentRepository;
import com.amazon.salaunch.demo.service.ContinentService;
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


import java.util.List;

import static com.amazon.salaunch.demo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link ContinentResource} REST controller.
 */
@SpringBootTest(classes = ShipManagementSystemApp.class)
public class ContinentResourceIT {

    private static final String DEFAULT_CONTINENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CONTINENT_NAME = "BBBBBBBBBB";

    @Autowired
    private ContinentRepository continentRepository;

    @Autowired
    private ContinentService continentService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restContinentMockMvc;

    private Continent continent;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContinentResource continentResource = new ContinentResource(continentService);
        this.restContinentMockMvc = MockMvcBuilders.standaloneSetup(continentResource)
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
    public static Continent createEntity() {
        Continent continent = new Continent()
            .continentName(DEFAULT_CONTINENT_NAME);
        return continent;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Continent createUpdatedEntity() {
        Continent continent = new Continent()
            .continentName(UPDATED_CONTINENT_NAME);
        return continent;
    }

    @BeforeEach
    public void initTest() {
        continentRepository.deleteAll();
        continent = createEntity();
    }

    @Test
    public void createContinent() throws Exception {
        int databaseSizeBeforeCreate = continentRepository.findAll().size();

        // Create the Continent
        restContinentMockMvc.perform(post("/api/continents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(continent)))
            .andExpect(status().isCreated());

        // Validate the Continent in the database
        List<Continent> continentList = continentRepository.findAll();
        assertThat(continentList).hasSize(databaseSizeBeforeCreate + 1);
        Continent testContinent = continentList.get(continentList.size() - 1);
        assertThat(testContinent.getContinentName()).isEqualTo(DEFAULT_CONTINENT_NAME);
    }

    @Test
    public void createContinentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = continentRepository.findAll().size();

        // Create the Continent with an existing ID
        continent.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restContinentMockMvc.perform(post("/api/continents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(continent)))
            .andExpect(status().isBadRequest());

        // Validate the Continent in the database
        List<Continent> continentList = continentRepository.findAll();
        assertThat(continentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllContinents() throws Exception {
        // Initialize the database
        continentRepository.save(continent);

        // Get all the continentList
        restContinentMockMvc.perform(get("/api/continents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(continent.getId())))
            .andExpect(jsonPath("$.[*].continentName").value(hasItem(DEFAULT_CONTINENT_NAME.toString())));
    }
    
    @Test
    public void getContinent() throws Exception {
        // Initialize the database
        continentRepository.save(continent);

        // Get the continent
        restContinentMockMvc.perform(get("/api/continents/{id}", continent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(continent.getId()))
            .andExpect(jsonPath("$.continentName").value(DEFAULT_CONTINENT_NAME.toString()));
    }

    @Test
    public void getNonExistingContinent() throws Exception {
        // Get the continent
        restContinentMockMvc.perform(get("/api/continents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateContinent() throws Exception {
        // Initialize the database
        continentService.save(continent);

        int databaseSizeBeforeUpdate = continentRepository.findAll().size();

        // Update the continent
        Continent updatedContinent = continentRepository.findById(continent.getId()).get();
        updatedContinent
            .continentName(UPDATED_CONTINENT_NAME);

        restContinentMockMvc.perform(put("/api/continents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedContinent)))
            .andExpect(status().isOk());

        // Validate the Continent in the database
        List<Continent> continentList = continentRepository.findAll();
        assertThat(continentList).hasSize(databaseSizeBeforeUpdate);
        Continent testContinent = continentList.get(continentList.size() - 1);
        assertThat(testContinent.getContinentName()).isEqualTo(UPDATED_CONTINENT_NAME);
    }

    @Test
    public void updateNonExistingContinent() throws Exception {
        int databaseSizeBeforeUpdate = continentRepository.findAll().size();

        // Create the Continent

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContinentMockMvc.perform(put("/api/continents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(continent)))
            .andExpect(status().isBadRequest());

        // Validate the Continent in the database
        List<Continent> continentList = continentRepository.findAll();
        assertThat(continentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteContinent() throws Exception {
        // Initialize the database
        continentService.save(continent);

        int databaseSizeBeforeDelete = continentRepository.findAll().size();

        // Delete the continent
        restContinentMockMvc.perform(delete("/api/continents/{id}", continent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Continent> continentList = continentRepository.findAll();
        assertThat(continentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Continent.class);
        Continent continent1 = new Continent();
        continent1.setId("id1");
        Continent continent2 = new Continent();
        continent2.setId(continent1.getId());
        assertThat(continent1).isEqualTo(continent2);
        continent2.setId("id2");
        assertThat(continent1).isNotEqualTo(continent2);
        continent1.setId(null);
        assertThat(continent1).isNotEqualTo(continent2);
    }
}
