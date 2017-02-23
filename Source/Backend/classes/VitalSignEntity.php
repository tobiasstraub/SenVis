<?php

class VitalSignEntity implements JsonSerializable
{
    protected $id;
    protected $timestamp;
    protected $amplitude;
    protected $patientId;

    public function __construct(array $data)
    {
        // no id if we're creating
        if (isset($data['id'])) {
            $this->id = $data['id'];
        }
        $this->timestamp = $data['timestamp'];
        $this->amplitude = $data['amplitude'];
        $this->patientId = $data['patientId'];
    }

    public function getId()
    {
        return $this->id;
    }

    public function getTimestamp()
    {
        return $this->timestamp;
    }

    public function getAmplitude()
    {
        return $this->amplitude;
    }

    public function getPatientId()
    {
        return $this->patientId;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'timestamp' => $this->getTimestamp(),
            'amplitude' => $this->getAmplitude(),
            'patientId' => $this->getPatientId()
        ];
    }
}
