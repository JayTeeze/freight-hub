package com.jayteeze.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.jayteeze.entity.Address;

@Transactional
@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
	
	@Modifying
	@Query("UPDATE Address A set A.street = ?1, A.city = ?2, A.state = ?3, A.zip = ?4 WHERE A.addressId = ?5")
	void updateUserAddress(String street, String city, String state, String zip, Integer addressId);

}
