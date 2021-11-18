package com.jayteeze.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.jayteeze.entity.Address;
import com.jayteeze.repository.AddressRepository;

@CrossOrigin
@RestController
public class AddressController {
	
	@Autowired
	AddressRepository addressRepository;
	
	// Updates user's address
	@RequestMapping(value="/updateUserAddress", 
			 consumes=MediaType.APPLICATION_JSON_VALUE, 
			 produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.POST)
	private void updateUserAddress(@RequestBody Address address) {
		addressRepository.updateUserAddress(address.getStreet(), address.getCity(), 
				address.getState(), address.getZip(), address.getAddressId());
	}

}
