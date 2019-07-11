package com.amazon.salaunch.demo.repository;

import com.amazon.salaunch.demo.domain.ShipLog;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the ShipLog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShipLogRepository extends MongoRepository<ShipLog, String> {

}
