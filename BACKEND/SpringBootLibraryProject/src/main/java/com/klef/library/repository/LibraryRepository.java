package com.klef.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.library.entity.libraryEntity;

@Repository
public interface LibraryRepository extends JpaRepository<libraryEntity, Integer>{

}
