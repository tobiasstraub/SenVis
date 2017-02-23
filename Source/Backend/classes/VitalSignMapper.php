<?php

class VitalSignMapper extends Mapper
{
    public function getVitalSignByPatient($patient_id, $params)
    {
        $row_limit = array_key_exists('limit', $params) ? $params['limit'] : "50";
        $offset = array_key_exists('offset', $params) ? $params['offset'] : "0";
        $stmt = $this->db->prepare("SELECT * FROM VitalSign WHERE patientId = :patient_id LIMIT $offset, $row_limit");
        $stmt->execute(["patient_id" => $patient_id]);
        $results = [];
        while ($row = $stmt->fetch()) {
            $results[] = new VitalSignEntity($row);
        }
        return $results;
    }

    public function save(VitalSignEntity $vitalSign)
    {
        $stmt = $this->db->prepare("INSERT INTO VitalSign(timestamp, amplitude, patientId) VALUES (:timestamp, :amplitude, :patientId)");
        $result = $stmt->execute([
            "timestamp" => $vitalSign->getTimestamp(),
            "amplitude" => $vitalSign->getAmplitude(),
            "patientId" => $vitalSign->getPatientId()
        ]);
        if (!$result) {
            throw new Exception("Could not save record");
        }
    }
}
