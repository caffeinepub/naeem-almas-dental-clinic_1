import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type AppointmentId = bigint;
export interface Appointment {
    treatmentNeeded: string;
    message?: string;
    preferredTime: Time;
    patientName: string;
    phoneNumber: string;
}
export type Time = bigint;
export interface backendInterface {
    bookAppointment(patientName: string, phoneNumber: string, treatmentNeeded: string, preferredTime: Time, message: string | null): Promise<void>;
    getAllAppointments(): Promise<Array<[AppointmentId, Appointment]>>;
    getAppointment(appointmentId: AppointmentId): Promise<Appointment>;
}
