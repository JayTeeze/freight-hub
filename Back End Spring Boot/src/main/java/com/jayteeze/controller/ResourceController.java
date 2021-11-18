package com.jayteeze.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jayteeze.entity.Resource;
import com.jayteeze.repository.ResourceRepository;

@CrossOrigin
@RestController
public class ResourceController {
	
	@Autowired
	ResourceRepository resourceRepository;
	
	@RequestMapping(value="/addUserResource", 
			 consumes=MediaType.APPLICATION_JSON_VALUE, 
			 produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.POST)
	private void addUserResource(@RequestBody Resource resource) {
		// User id will be set by react
		resourceRepository.save(resource);
	}
	
	@RequestMapping(value="/findResourceById", 
			 produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.GET)
	@ResponseBody
	private ResponseEntity<Optional<Resource>> findResource(Integer id) {
		Optional<Resource> resource = resourceRepository.findById(id);
		return new ResponseEntity<>(resource, HttpStatus.OK);
	}
	
	@RequestMapping(value="/findAllResources", 
			 produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.GET)
	@ResponseBody
	private ResponseEntity<List<Resource>> findAllResources() {
		List<Resource> resource = resourceRepository.findAll();
		return new ResponseEntity<>(resource, HttpStatus.OK);
	}
	
	@RequestMapping(value="/findUserResource", 
			 consumes=MediaType.APPLICATION_JSON_VALUE, 
			 produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.POST)
	private ResponseEntity<Resource> findUserResource(@RequestBody Resource selected) {
		Resource resource = resourceRepository.findUserResource(selected.getUserId(), selected.getResourceId());
		if (resource != null) {
			return new ResponseEntity<>(resource, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(value="/findAllUserResources", 
			 produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.GET)
	@ResponseBody
	private ResponseEntity<List<Resource>> findAllUserResources(Integer userId) {
		List<Resource> resource = resourceRepository.findAllUserResources(userId);
		return new ResponseEntity<>(resource, HttpStatus.OK);
	}
	
	@RequestMapping(value="/updateResource", 
			 consumes=MediaType.APPLICATION_JSON_VALUE, 
			 produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.POST)
	private void updateResource(@RequestBody Resource resource) {
		resourceRepository.updateResource(resource.getType(), resource.getDescription(), resource.getQuantity(), resource.getResourceId());
	}
	
	@RequestMapping(value="/deleteSelectedResource", 
			 produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.GET)
	@ResponseBody
	private void deleteSelectedResource(Integer resourceId) {
		resourceRepository.deleteById(resourceId);
	}

}
