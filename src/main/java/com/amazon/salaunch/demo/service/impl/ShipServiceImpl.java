package com.amazon.salaunch.demo.service.impl;

import com.amazon.salaunch.demo.service.ShipService;
import com.amazon.salaunch.demo.domain.Ship;
import com.amazon.salaunch.demo.repository.ShipRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Ship}.
 */
@Service
public class ShipServiceImpl implements ShipService {

    private final Logger log = LoggerFactory.getLogger(ShipServiceImpl.class);

    private final ShipRepository shipRepository;

    public ShipServiceImpl(ShipRepository shipRepository) {
        this.shipRepository = shipRepository;
    }

    /**
     * Save a ship.
     *
     * @param ship the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Ship save(Ship ship) {
        log.debug("Request to save Ship : {}", ship);
        return shipRepository.save(ship);
    }

    /**
     * Get all the ships.
     *
     * @return the list of entities.
     */
    @Override
    public List<Ship> findAll() {
        log.debug("Request to get all Ships");
        return shipRepository.findAll();
    }


    /**
     * Get one ship by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<Ship> findOne(String id) {
        log.debug("Request to get Ship : {}", id);
        return shipRepository.findById(id);
    }

    /**
     * Delete the ship by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Ship : {}", id);
        shipRepository.deleteById(id);
    }
}
