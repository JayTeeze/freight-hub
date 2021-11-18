package com.jayteeze.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.jayteeze.entity.Resource;

@Transactional
@Repository
public interface ResourceRepository extends JpaRepository<Resource, Integer> {
	
	@Modifying
	@Query("UPDATE Resource R set R.type = ?1, R.description = ?2, R.quantity = ?3 WHERE R.resourceId = ?4")
	void updateResource(String type, String description, Integer quantity, Integer resourceId);
	
	@Query("SELECT R FROM Resource R WHERE R.userId = ?1")
	List<Resource> findAllUserResources(Integer userId);
	
	@Modifying
	@Query("DELETE Resource R WHERE R.resourceId = ?1")
	void deleteResource(Integer resourceId);
	
	@Query("SELECT R FROM Resource R WHERE R.userId = ?1 AND R.resourceId = ?2")
	Resource findUserResource(Integer userId, Integer resourceId);

}
