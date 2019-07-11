package com.amazon.salaunch.demo.service;

import com.amazon.salaunch.demo.domain.Continent;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Continent}.
 */
public interface ContinentService {

    /**
     * Save a continent.
     *
     * @param continent the entity to save.
     * @return the persisted entity.
     */
    Continent save(Continent continent);

    /**
     * Get all the continents.
     *
     * @return the list of entities.
     */
    List<Continent> findAll();


    /**
     * Get the "id" continent.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Continent> findOne(String id);

    /**
     * Delete the "id" continent.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
