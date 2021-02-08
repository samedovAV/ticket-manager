package com.samedov.ticketmanager.repository;

import com.samedov.ticketmanager.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

}
