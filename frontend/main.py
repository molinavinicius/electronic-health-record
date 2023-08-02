import streamlit as st
import requests
from pydantic import BaseModel
from enum import Enum
from typing import Optional, List


class Gender(str, Enum):
    Male = ("male",)
    Female = "female"


class Patient(BaseModel):
    id: int
    name: str
    phone: str
    email: str
    birthDate: str
    gender: Gender
    height: int
    weight: int


def get_patients(id: Optional[int] = None) -> Optional[List[Patient]]:
    res = requests.get(f"http://localhost:8080/patients/{id or ''}")
    if res.status_code == 200:
        return [Patient(**p) for p in res.json()["data"]]


st.title("Pacientes")
tab1, tab2 = st.tabs(["🔍 Lista", "🗃 Criar"])


patients = get_patients()
if patients is not None:
    for patient in patients:
        with st.expander(f"{patient.id} - {patient.name} ({patient.email})"):
            st.write(patient.__dict__)
