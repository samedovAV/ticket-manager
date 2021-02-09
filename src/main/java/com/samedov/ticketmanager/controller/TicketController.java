package com.samedov.ticketmanager.controller;

import com.samedov.ticketmanager.entity.Ticket;
import com.samedov.ticketmanager.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TicketController {

    final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping("/ticket")
    private List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/ticket/{id}")
    private Ticket getTicket(@PathVariable("id") Long id) {
        return ticketService.getTicketById(id);
    }

    @DeleteMapping("/ticket/{id}")
    private void deleteTicket(@PathVariable("id") Long id) {
        ticketService.delete(id);
    }

    @PostMapping("/ticket")
    private Long saveTicket(@RequestBody Ticket ticket) {
        ticketService.save(ticket);
        return ticket.getId();
    }

    @PutMapping("/ticket/{id}")
    private Ticket updateTicket(@PathVariable("id") Ticket ticketFromDb,
                              @RequestBody Ticket ticket) {
        return ticketService.update(ticket, ticketFromDb);
    }

}
