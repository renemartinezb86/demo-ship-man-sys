package com.amazon.salaunch.demo.service.impl;

import com.amazon.salaunch.demo.service.ContinentService;
import com.amazon.salaunch.demo.domain.Continent;
import com.amazon.salaunch.demo.repository.ContinentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Continent}.
 */
@Service
public class ContinentServiceImpl implements ContinentService {

    private final Logger log = LoggerFactory.getLogger(ContinentServiceImpl.class);

    private final ContinentRepository continentRepository;

    public ContinentServiceImpl(ContinentRepository continentRepository) {
        this.continentRepository = continentRepository;
    }

    /**
     * Save a continent.
     *
     * @param continent the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Continent save(Continent continent) {
        log.debug("Request to save Continent : {}", continent);
        return continentRepository.save(continent);
    }

    /**
     * Get all the continents.
     *
     * @return the list of entities.
     */
    @Override
    public List<Continent> findAll() {
        log.debug("Request to get all Continents");
        return continentRepository.findAll();
    }


    /**
     * Get one continent by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<Continent> findOne(String id) {
        log.debug("Request to get Continent : {}", id);
        return continentRepository.findById(id);
    }

    /**
     * Delete the continent by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Continent : {}", id);
        continentRepository.deleteById(id);
    }
}
