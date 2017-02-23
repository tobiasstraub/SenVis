<?php

class PatientEntity implements JsonSerializable
{
    protected $id;
    protected $firstname;
    protected $lastname;
    protected $weight;
    protected $birthday;
    protected $sex;

    public function __construct(array $data)
    {
        // no id if we're creating
        if (isset($data['id'])) {
            $this->id = $data['id'];
        }
        $this->firstname = $data['firstname'];
        $this->lastname = $data['lastname'];
        $this->weight = $data['weight'];
        $this->birthday = $data['birthday'];
        $this->sex = $data['sex'];
    }

    public function getId()
    {
        return $this->id;
    }

    public function getFirstname()
    {
        return $this->firstname;
    }

    public function getLastname()
    {
        return $this->lastname;
    }

    public function getWeight()
    {
        return $this->weight;
    }

    public function getBirthday()
    {
        return $this->birthday;
    }

    public function getSex()
    {
        return $this->sex;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'firstname' => $this->getFirstname(),
            'lastname' => $this->getLastname(),
            'weight' => $this->getWeight(),
            'birthday' => $this->getBirthday(),
            'sex' => $this->getSex()
        ];
    }
}
