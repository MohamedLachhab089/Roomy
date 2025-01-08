package com.med.roomy.repository;

import com.med.roomy.entity.User;
import com.med.roomy.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUserRole(UserRole userRole);
}
