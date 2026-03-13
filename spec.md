# Naeem & Almas Dental Clinic

## Current State
Full clinic website with appointment booking form. Backend stores appointments via `bookAppointment` and exposes `getAllAppointments`. No admin panel exists.

## Requested Changes (Diff)

### Add
- Admin dashboard page at `/admin` route
- Password-protected login (hardcoded PIN/password, no auth canister needed)
- Table showing all submitted appointments: patient name, phone, treatment, preferred time, message
- Logout button

### Modify
- App.tsx to add `/admin` route

### Remove
- Nothing

## Implementation Plan
1. Add `/admin` route in App.tsx
2. Create `AdminPage.tsx` with a simple password gate (hardcoded password) and appointment table
3. On login, fetch all appointments via `getAllAppointments()` and display in a styled table
