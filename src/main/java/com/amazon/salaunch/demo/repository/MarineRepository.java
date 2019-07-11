package com.amazon.salaunch.demo.repository;

import com.amazon.salaunch.demo.domain.Marine;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Marine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MarineRepository extends MongoRepository<Marine, String> {

}
