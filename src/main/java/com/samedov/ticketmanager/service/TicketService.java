package com.samedov.ticketmanager.service;

import com.samedov.ticketmanager.entity.Ticket;
import com.samedov.ticketmanager.repository.TicketRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class TicketService {

    final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(Long id) {
        Ticket ticket = ticketRepository.findById(id).orElse(null);
        if (ticket == null) {
            throw new EntityNotFoundException("No ticket with id " + id);
        }
        return ticket;
    }

    public void delete(Long id) {
        ticketRepository.deleteById(id);
    }

    public void save(Ticket ticket) {
        ticketRepository.save(ticket);
    }

    public void update(Long id) {
        Ticket ticket = ticketRepository.findById(id).orElse(null);
        if (ticket == null) {
            throw new EntityNotFoundException("No ticket with id " + id);
        }
        ticket.setTicketName("new name");
        ticketRepository.save(ticket);
    }
}
