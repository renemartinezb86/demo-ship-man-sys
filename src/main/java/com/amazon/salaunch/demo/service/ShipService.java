package com.amazon.salaunch.demo.service;

import com.amazon.salaunch.demo.domain.Ship;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Ship}.
 */
public interface ShipService {

    /**
     * Save a ship.
     *
     * @param ship the entity to save.
     * @return the persisted entity.
     */
    Ship save(Ship ship);

    /**
     * Get all the ships.
     *
     * @return the list of entities.
     */
    List<Ship> findAll();


    /**
     * Get the "id" ship.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Ship> findOne(String id);

    /**
     * Delete the "id" ship.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
