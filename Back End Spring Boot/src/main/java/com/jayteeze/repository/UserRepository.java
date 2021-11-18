package com.jayteeze.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.jayteeze.entity.User;

@Transactional
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	
	@Query("SELECT U FROM User U WHERE U.email = ?1 AND U.password = ?2")
	User authenticate(String email, String password);
	
	@Query("SELECT U FROM User U WHERE U.email = ?1")
	User findByEmail(String email);
	
	@Modifying
	@Query("UPDATE User U set U.firstName = ?1, U.lastName = ?2, U.email = ?3, "
			+ "U.password = ?4, U.telephone = ?5, U.businessName = ?6, "
			+ "U.businessDescription = ?7, U.website = ?8 WHERE U.userId = ?9")
	void updateUser(String firstName, String lastName, String email, 
			String password, String telephone, String businessName, 
			String businessDescription, String website, Integer userId);
	
	@Query("SELECT U FROM User U where U.firstName LIKE %?1% OR U.lastName LIKE %?1% OR U.firstName + ' ' + U.lastName LIKE %?1% OR U.businessName LIKE %?1% OR U.address.city LIKE %?1% OR U.address.state LIKE %?1%")
	List<User> searchForUser(String searchQuery);
}
