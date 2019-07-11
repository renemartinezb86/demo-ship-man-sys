package com.amazon.salaunch.demo.repository;

import com.amazon.salaunch.demo.domain.Ship;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Ship entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShipRepository extends MongoRepository<Ship, String> {

}
