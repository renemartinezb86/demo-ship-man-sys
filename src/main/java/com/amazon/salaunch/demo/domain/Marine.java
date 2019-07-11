package com.amazon.salaunch.demo.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Marine.
 */
@Document(collection = "marine")
public class Marine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("first_name")
    private String firstName;

    @Field("last_name")
    private String lastName;

    @Field("email")
    private String email;

    @Field("phone_number")
    private String phoneNumber;

    @Field("hire_date")
    private Instant hireDate;

    @Field("rank")
    private Long rank;

    @DBRef
    @Field("ship")
    @JsonIgnoreProperties("marines")
    private Ship ship;

    @DBRef
    @Field("job")
    private Set<Job> jobs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Marine firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Marine lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public Marine email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Marine phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Instant getHireDate() {
        return hireDate;
    }

    public Marine hireDate(Instant hireDate) {
        this.hireDate = hireDate;
        return this;
    }

    public void setHireDate(Instant hireDate) {
        this.hireDate = hireDate;
    }

    public Long getRank() {
        return rank;
    }

    public Marine rank(Long rank) {
        this.rank = rank;
        return this;
    }

    public void setRank(Long rank) {
        this.rank = rank;
    }

    public Ship getShip() {
        return ship;
    }

    public Marine ship(Ship ship) {
        this.ship = ship;
        return this;
    }

    public void setShip(Ship ship) {
        this.ship = ship;
    }

    public Set<Job> getJobs() {
        return jobs;
    }

    public Marine jobs(Set<Job> jobs) {
        this.jobs = jobs;
        return this;
    }

    public Marine addJob(Job job) {
        this.jobs.add(job);
        job.setMarine(this);
        return this;
    }

    public Marine removeJob(Job job) {
        this.jobs.remove(job);
        job.setMarine(null);
        return this;
    }

    public void setJobs(Set<Job> jobs) {
        this.jobs = jobs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Marine)) {
            return false;
        }
        return id != null && id.equals(((Marine) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Marine{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", hireDate='" + getHireDate() + "'" +
            ", rank=" + getRank() +
            "}";
    }
}
