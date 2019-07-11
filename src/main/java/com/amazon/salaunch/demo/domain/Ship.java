package com.amazon.salaunch.demo.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Ship.
 */
@Document(collection = "ship")
public class Ship implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("ship_name")
    private String shipName;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getShipName() {
        return shipName;
    }

    public Ship shipName(String shipName) {
        this.shipName = shipName;
        return this;
    }

    public void setShipName(String shipName) {
        this.shipName = shipName;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ship)) {
            return false;
        }
        return id != null && id.equals(((Ship) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Ship{" +
            "id=" + getId() +
            ", shipName='" + getShipName() + "'" +
            "}";
    }
}
