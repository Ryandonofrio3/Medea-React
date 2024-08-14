// import { patientData } from './compiledPatientData';
// import { PatientStore, ChatSession, Patient } from '../types/types';

// let PATIENT_FILES_LOADED = false;
// const PATIENT_FILES: Record<string, Patient> = {};

// export async function buildPatientStore(): Promise<PatientStore> {
//   if (!PATIENT_FILES_LOADED) {
//     for (const patient of patientData) {
//       PATIENT_FILES[patient.id] = {
//         id: patient.id,
//         firstName: patient.firstName,
//         lastName: patient.lastName,
//         age: patient.age,
//         gender: patient.gender,
//       };
//     }

//     PATIENT_FILES_LOADED = true;
//     console.log(`Loaded ${Object.keys(PATIENT_FILES).length} patient files`);
//   }

//   return {
//     getPatients: () => Object.values(PATIENT_FILES),
//     getPatientById: (id: string) => PATIENT_FILES[id] || null,
//     saveChatSession,
//     getChatSessions,
//     getChatSessionById,
//   };
// }

// // ... rest of the file remains the same

import { Patient } from '../types/types';

export async function getPatients(): Promise<Patient[]> {
  const patients: Patient[] = [];
  return patients;
}


export async function getPatientById(id: string): Promise<Patient | null> {
  console.log('getPatientById', id);
  return null;
}