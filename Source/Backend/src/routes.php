<?php
// Routes
$app->get('/patient', function ($request, $response) {
    $this->logger->info("Patients list");
    $mapper = new PatientMapper($this->db);
    $patients = $mapper->getPatients();
    return $response->withJson($patients);
});

$app->get('/patient/{id}', function ($request, $response, $args) {
    $patient_id = (int)$args['id'];
    $mapper = new PatientMapper($this->db);
    $patient = $mapper->getPatientById($patient_id);
    return $response->withJson($patient);
});

$app->get('/patient/{id}/vitalsign', function ($request, $response, $args) {
    $patient_id = (int)$args['id'];
    $mapper = new VitalSignMapper($this->db);
    $vitalSign = $mapper->getVitalSignByPatient($patient_id, $request->getQueryParams());
    return $response->withJson($vitalSign);
});

$app->post('/vitalsign/new', function ($request, $response) {
    $data = $request->getParsedBody();
    $vitalSign_data = [];
    $vitalSign_data['timestamp'] = $data['timestamp'];
    $vitalSign_data['amplitude'] = filter_var($data['amplitude'], FILTER_SANITIZE_STRING);
    $vitalSign_data['patientId'] = filter_var($data['patientId'], FILTER_SANITIZE_STRING);
    $vitalSign = new VitalSignEntity($vitalSign_data);
    $mapper = new VitalSignMapper($this->db);
    $mapper->save($vitalSign);
    //$response = $response->withRedirect("/senvis/api/patient/" . $vitalSign_data['patientId'] . "/vitalsign");
    return $response;
});
