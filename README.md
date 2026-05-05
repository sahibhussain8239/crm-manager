### This is Project of Event managment with CRM stystem in it, this is for small buninesses to big organization

# Setup and run
use ```pnpm add``` for installing pakages
use ```pnpm dev``` for running this
also start mongoDb atlas for database connectivity

# Walkthrough
On landing page there was a register a oraganization button to register your company, the one who will create it he/she will be the sales admin, the structure of this project is like

```
1. First There was a sales admin who manage the and add events and add or make production admin
                |
                |
                ⋁
2.Production admin Dashboard: Show only the events that are setted booked from sales admin, His role is to add and manage Team Managers for specific event he can add Manager and assign a event to him
                |
                |
                ⋁
3.Manager: His role is to manage Team and assogn specific roles to them like assign event to a team member - Photographer, Manager can add team member also
                |
                |
                ⋁
4.Team MEmber: There role was onsite handle task that they have assigned, they can make the event as started and completed that will be deleted in 3 days for memory ease
```

# Current tree
```
                  Registration 
                      |
                      ⋁
    Make a organisation and become sales admin
                      |
                      ⋁
  sales admin add and manage events and on another tab add PA that makes a email and password to login
                      |
                      ⋁
  PA(production admin) assign event to managers and make managers
                      |
                      ⋁
    Manager creates team and assign task to them
                      |
                      ⋁
    Team maembers work onsite and update event dashbord
```
