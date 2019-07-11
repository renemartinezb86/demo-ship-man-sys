package com.amazon.salaunch.demo.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;

/**
 * A Location.
 */
@Document(collection = "location")
public class Location implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("sea_quadrant")
    private String seaQuadrant;

    @Field("friendlys")
    private String friendlys;

    @Field("hostiles")
    private String hostiles;

    @Field("status")
    private String status;

    @DBRef
    @Field("continent")
    private Continent continent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSeaQuadrant() {
        return seaQuadrant;
    }

    public Location seaQuadrant(String seaQuadrant) {
        this.seaQuadrant = seaQuadrant;
        return this;
    }

    public void setSeaQuadrant(String seaQuadrant) {
        this.seaQuadrant = seaQuadrant;
    }

    public String getFriendlys() {
        return friendlys;
    }

    public Location friendlys(String friendlys) {
        this.friendlys = friendlys;
        return this;
    }

    public void setFriendlys(String friendlys) {
        this.friendlys = friendlys;
    }

    public String getHostiles() {
        return hostiles;
    }

    public Location hostiles(String hostiles) {
        this.hostiles = hostiles;
        return this;
    }

    public void setHostiles(String hostiles) {
        this.hostiles = hostiles;
    }

    public String getStatus() {
        return status;
    }

    public Location status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Continent getContinent() {
        return continent;
    }

    public Location continent(Continent continent) {
        this.continent = continent;
        return this;
    }

    public void setContinent(Continent continent) {
        this.continent = continent;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Location)) {
            return false;
        }
        return id != null && id.equals(((Location) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Location{" +
            "id=" + getId() +
            ", seaQuadrant='" + getSeaQuadrant() + "'" +
            ", friendlys='" + getFriendlys() + "'" +
            ", hostiles='" + getHostiles() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
