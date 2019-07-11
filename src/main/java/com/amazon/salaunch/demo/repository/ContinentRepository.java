package com.amazon.salaunch.demo.repository;

import com.amazon.salaunch.demo.domain.Continent;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Continent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContinentRepository extends MongoRepository<Continent, String> {

}
