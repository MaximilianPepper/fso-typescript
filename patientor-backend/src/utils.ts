import {
  PatientWithoutId,
  Gender,
  EntryWithoutId,
  HealthCheckRating,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};
const parseDescription = (name: unknown): string => {
  if (!isString(name) || !name) {
    throw new Error("Incorrect or missing description");
  }
  return name;
};
const parseCriteria = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing criteria");
  }
  return name;
};
const parseSpecialist = (name: unknown): string => {
  if (!isString(name) || !name) {
    throw new Error("Incorrect or missing specialist");
  }
  return name;
};
const parseDischarge = (obj: unknown): any => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Incorrect discharge object");
  }
  if (!("date" in obj) || !("criteria" in obj)) {
    throw new Error("Missing discharge properties");
  }
  return {
    date: parseDate(obj.date),
    criteria: parseCriteria(obj.criteria),
  };
};
const parseSickLeave = (obj: unknown): any => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Incorrect sickleave object");
  }
  if (!("startDate" in obj) || !("endDate" in obj)) {
    throw new Error("Missing sickleave properties");
  }
  return {
    startDate: parseDate(obj.startDate),
    endDate: parseDate(obj.endDate),
  };
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) throw new Error("Incorrect or missing ssn");
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

const isRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (typeof rating !== "number" || !isRating(rating)) {
    throw new Error("Incorrect rating: " + rating);
  }
  return rating;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) throw new Error("Incorrect or missing occupation");
  return occupation;
};

const checkNewPatient = (object: unknown): PatientWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newObject: PatientWithoutId = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [], // temp placeholder
    };
    return newObject;
  }
  throw new Error("Incorrect data: a field missing");
};

export const checkNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  // Check for common fields
  if ("description" in object && "date" in object && "specialist" in object) {
    const description = parseDescription(object.description);
    const date = parseDate(object.date);
    const specialist = parseSpecialist(object.specialist);

    // Determine the type of the entry and check for type-specific fields
    if ("type" in object) {
      switch (object.type) {
        case "Hospital":
          if ("discharge" in object) {
            const discharge = parseDischarge(object.discharge);
            return {
              description,
              date,
              specialist,
              type: "Hospital",
              discharge,
            };
          }
          break;

        case "OccupationalHealthcare":
          if ("employerName" in object) {
            const employerName = parseName(object.employerName);
            const sickLeave =
              "sickLeave" in object
                ? parseSickLeave(object.sickLeave)
                : undefined;
            return {
              description,
              date,
              specialist,
              type: "OccupationalHealthcare",
              employerName,
              sickLeave,
            };
          }
          break;

        case "HealthCheck":
          if ("healthCheckRating" in object) {
            const healthCheckRating = parseHealthCheckRating(
              object.healthCheckRating
            );
            const newObject = {
              description: parseDescription(object.description),
              date: parseDate(object.date),
              specialist: parseSpecialist(object.specialist),
              type: object.type,
              healthCheckRating,
            };
            return newObject;
          }
          break;

        default:
          throw new Error("Incorrect data: unknown entry type");
      }
    }
  }
  throw new Error("Incorrect data: a field is missing or incorrect");
};

export default checkNewPatient;
