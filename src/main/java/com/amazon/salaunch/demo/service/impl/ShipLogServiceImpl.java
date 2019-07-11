package com.amazon.salaunch.demo.service.impl;

import com.amazon.salaunch.demo.service.ShipLogService;
import com.amazon.salaunch.demo.domain.ShipLog;
import com.amazon.salaunch.demo.repository.ShipLogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ShipLog}.
 */
@Service
public class ShipLogServiceImpl implements ShipLogService {

    private final Logger log = LoggerFactory.getLogger(ShipLogServiceImpl.class);

    private final ShipLogRepository shipLogRepository;

    public ShipLogServiceImpl(ShipLogRepository shipLogRepository) {
        this.shipLogRepository = shipLogRepository;
    }

    /**
     * Save a shipLog.
     *
     * @param shipLog the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ShipLog save(ShipLog shipLog) {
        log.debug("Request to save ShipLog : {}", shipLog);
        return shipLogRepository.save(shipLog);
    }

    /**
     * Get all the shipLogs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    public Page<ShipLog> findAll(Pageable pageable) {
        log.debug("Request to get all ShipLogs");
        return shipLogRepository.findAll(pageable);
    }


    /**
     * Get one shipLog by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<ShipLog> findOne(String id) {
        log.debug("Request to get ShipLog : {}", id);
        return shipLogRepository.findById(id);
    }

    /**
     * Delete the shipLog by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete ShipLog : {}", id);
        shipLogRepository.deleteById(id);
    }
}
