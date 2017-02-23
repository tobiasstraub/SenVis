<?php

class PatientMapper extends Mapper
{
    public function getPatients()
    {
        $stmt = $this->db->query("SELECT * FROM Patients");
        $results = [];
        while ($row = $stmt->fetch()) {
            $results[] = new PatientEntity($row);
        }
        return $results;
    }

    public function getPatientById($patient_id)
    {
        $stmt = $this->db->prepare("SELECT * FROM Patients WHERE id = :patient_id");
        $result = $stmt->execute(["patient_id" => $patient_id]);
        if ($result) {
            return new PatientEntity($stmt->fetch());
        }
    }
}
