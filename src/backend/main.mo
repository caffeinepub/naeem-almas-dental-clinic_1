import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type AppointmentId = Nat;

  type Appointment = {
    patientName : Text;
    phoneNumber : Text;
    treatmentNeeded : Text;
    preferredTime : Time.Time;
    message : ?Text;
  };

  var nextAppointmentId = 0;

  module Appointment {
    public func compare(appointment1 : (AppointmentId, Appointment), appointment2 : (AppointmentId, Appointment)) : Order.Order {
      Nat.compare(appointment2.0, appointment1.0);
    };
  };

  let appointments = Map.empty<AppointmentId, Appointment>();

  public shared ({ caller }) func bookAppointment(patientName : Text, phoneNumber : Text, treatmentNeeded : Text, preferredTime : Time.Time, message : ?Text) : async () {
    let appointment : Appointment = {
      patientName;
      phoneNumber;
      treatmentNeeded;
      preferredTime;
      message;
    };
    let appointmentId = nextAppointmentId;
    appointments.add(appointmentId, appointment);
    nextAppointmentId += 1;
  };

  public query ({ caller }) func getAppointment(appointmentId : AppointmentId) : async Appointment {
    switch (appointments.get(appointmentId)) {
      case (null) { Runtime.trap("Appointment does not exist.") };
      case (?appointment) { appointment };
    };
  };

  public query ({ caller }) func getAllAppointments() : async [(AppointmentId, Appointment)] {
    appointments.entries().toArray().sort();
  };
};
