package com.amazon.salaunch.demo.web.rest;

import com.amazon.salaunch.demo.ShipManagementSystemApp;
import com.amazon.salaunch.demo.domain.ShipLog;
import com.amazon.salaunch.demo.repository.ShipLogRepository;
import com.amazon.salaunch.demo.service.ShipLogService;
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

import com.amazon.salaunch.demo.domain.enumeration.EntryType;
/**
 * Integration tests for the {@Link ShipLogResource} REST controller.
 */
@SpringBootTest(classes = ShipManagementSystemApp.class)
public class ShipLogResourceIT {

    private static final Instant DEFAULT_DATETIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATETIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_ENTRYTEXT = "AAAAAAAAAA";
    private static final String UPDATED_ENTRYTEXT = "BBBBBBBBBB";

    private static final EntryType DEFAULT_ENTRYTYPE = EntryType.COMMAND;
    private static final EntryType UPDATED_ENTRYTYPE = EntryType.COMMUNICATION;

    @Autowired
    private ShipLogRepository shipLogRepository;

    @Autowired
    private ShipLogService shipLogService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restShipLogMockMvc;

    private ShipLog shipLog;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ShipLogResource shipLogResource = new ShipLogResource(shipLogService);
        this.restShipLogMockMvc = MockMvcBuilders.standaloneSetup(shipLogResource)
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
    public static ShipLog createEntity() {
        ShipLog shipLog = new ShipLog()
            .datetime(DEFAULT_DATETIME)
            .entrytext(DEFAULT_ENTRYTEXT)
            .entrytype(DEFAULT_ENTRYTYPE);
        return shipLog;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ShipLog createUpdatedEntity() {
        ShipLog shipLog = new ShipLog()
            .datetime(UPDATED_DATETIME)
            .entrytext(UPDATED_ENTRYTEXT)
            .entrytype(UPDATED_ENTRYTYPE);
        return shipLog;
    }

    @BeforeEach
    public void initTest() {
        shipLogRepository.deleteAll();
        shipLog = createEntity();
    }

    @Test
    public void createShipLog() throws Exception {
        int databaseSizeBeforeCreate = shipLogRepository.findAll().size();

        // Create the ShipLog
        restShipLogMockMvc.perform(post("/api/ship-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shipLog)))
            .andExpect(status().isCreated());

        // Validate the ShipLog in the database
        List<ShipLog> shipLogList = shipLogRepository.findAll();
        assertThat(shipLogList).hasSize(databaseSizeBeforeCreate + 1);
        ShipLog testShipLog = shipLogList.get(shipLogList.size() - 1);
        assertThat(testShipLog.getDatetime()).isEqualTo(DEFAULT_DATETIME);
        assertThat(testShipLog.getEntrytext()).isEqualTo(DEFAULT_ENTRYTEXT);
        assertThat(testShipLog.getEntrytype()).isEqualTo(DEFAULT_ENTRYTYPE);
    }

    @Test
    public void createShipLogWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = shipLogRepository.findAll().size();

        // Create the ShipLog with an existing ID
        shipLog.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restShipLogMockMvc.perform(post("/api/ship-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shipLog)))
            .andExpect(status().isBadRequest());

        // Validate the ShipLog in the database
        List<ShipLog> shipLogList = shipLogRepository.findAll();
        assertThat(shipLogList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllShipLogs() throws Exception {
        // Initialize the database
        shipLogRepository.save(shipLog);

        // Get all the shipLogList
        restShipLogMockMvc.perform(get("/api/ship-logs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shipLog.getId())))
            .andExpect(jsonPath("$.[*].datetime").value(hasItem(DEFAULT_DATETIME.toString())))
            .andExpect(jsonPath("$.[*].entrytext").value(hasItem(DEFAULT_ENTRYTEXT.toString())))
            .andExpect(jsonPath("$.[*].entrytype").value(hasItem(DEFAULT_ENTRYTYPE.toString())));
    }
    
    @Test
    public void getShipLog() throws Exception {
        // Initialize the database
        shipLogRepository.save(shipLog);

        // Get the shipLog
        restShipLogMockMvc.perform(get("/api/ship-logs/{id}", shipLog.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(shipLog.getId()))
            .andExpect(jsonPath("$.datetime").value(DEFAULT_DATETIME.toString()))
            .andExpect(jsonPath("$.entrytext").value(DEFAULT_ENTRYTEXT.toString()))
            .andExpect(jsonPath("$.entrytype").value(DEFAULT_ENTRYTYPE.toString()));
    }

    @Test
    public void getNonExistingShipLog() throws Exception {
        // Get the shipLog
        restShipLogMockMvc.perform(get("/api/ship-logs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateShipLog() throws Exception {
        // Initialize the database
        shipLogService.save(shipLog);

        int databaseSizeBeforeUpdate = shipLogRepository.findAll().size();

        // Update the shipLog
        ShipLog updatedShipLog = shipLogRepository.findById(shipLog.getId()).get();
        updatedShipLog
            .datetime(UPDATED_DATETIME)
            .entrytext(UPDATED_ENTRYTEXT)
            .entrytype(UPDATED_ENTRYTYPE);

        restShipLogMockMvc.perform(put("/api/ship-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedShipLog)))
            .andExpect(status().isOk());

        // Validate the ShipLog in the database
        List<ShipLog> shipLogList = shipLogRepository.findAll();
        assertThat(shipLogList).hasSize(databaseSizeBeforeUpdate);
        ShipLog testShipLog = shipLogList.get(shipLogList.size() - 1);
        assertThat(testShipLog.getDatetime()).isEqualTo(UPDATED_DATETIME);
        assertThat(testShipLog.getEntrytext()).isEqualTo(UPDATED_ENTRYTEXT);
        assertThat(testShipLog.getEntrytype()).isEqualTo(UPDATED_ENTRYTYPE);
    }

    @Test
    public void updateNonExistingShipLog() throws Exception {
        int databaseSizeBeforeUpdate = shipLogRepository.findAll().size();

        // Create the ShipLog

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShipLogMockMvc.perform(put("/api/ship-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shipLog)))
            .andExpect(status().isBadRequest());

        // Validate the ShipLog in the database
        List<ShipLog> shipLogList = shipLogRepository.findAll();
        assertThat(shipLogList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteShipLog() throws Exception {
        // Initialize the database
        shipLogService.save(shipLog);

        int databaseSizeBeforeDelete = shipLogRepository.findAll().size();

        // Delete the shipLog
        restShipLogMockMvc.perform(delete("/api/ship-logs/{id}", shipLog.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ShipLog> shipLogList = shipLogRepository.findAll();
        assertThat(shipLogList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ShipLog.class);
        ShipLog shipLog1 = new ShipLog();
        shipLog1.setId("id1");
        ShipLog shipLog2 = new ShipLog();
        shipLog2.setId(shipLog1.getId());
        assertThat(shipLog1).isEqualTo(shipLog2);
        shipLog2.setId("id2");
        assertThat(shipLog1).isNotEqualTo(shipLog2);
        shipLog1.setId(null);
        assertThat(shipLog1).isNotEqualTo(shipLog2);
    }
}
