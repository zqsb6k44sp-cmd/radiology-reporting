// USG Report Templates

const USGTemplates = {
    abdomen: {
        id: 'abdomen',
        name: 'Abdomen USG',
        description: 'Complete abdominal ultrasound examination',
        template: `ULTRASOUND ABDOMEN

PATIENT NAME: {{patientName}}
AGE/DOB: {{age}}
GENDER: {{gender}}
DATE OF EXAMINATION: {{examDate}}
REFERRING DOCTOR: {{referringDoctor}}

CLINICAL HISTORY:
{{clinicalHistory}}

FINDINGS:

LIVER:
Normal in size and echotexture. No focal lesion. Intrahepatic biliary radicles are not dilated.

GALLBLADDER:
Normal in size. Wall thickness normal. No calculus/mass seen.

COMMON BILE DUCT:
Normal in caliber (measures ___ mm).

PANCREAS:
Normal in size and echotexture. Main pancreatic duct not dilated.

SPLEEN:
Normal in size and echotexture. No focal lesion.

KIDNEYS:
Both kidneys are normal in size, shape and position.
Right kidney measures: ___ cm
Left kidney measures: ___ cm
Cortical thickness and echotexture normal bilaterally.
No calculus/hydronephrosis/mass seen.

URINARY BLADDER:
Well distended. Wall thickness normal. No calculus/mass seen.

PROSTATE (if applicable):
Normal in size. No focal lesion.

OTHERS:
No free fluid in abdomen.
No significant lymphadenopathy.

IMPRESSION:
Study within normal limits.

[Additional findings/notes can be added above]

---
RADIOLOGIST: {{doctorName}}
DATE: {{reportDate}}`
    },

    pelvis: {
        id: 'pelvis',
        name: 'Pelvis USG',
        description: 'Pelvic ultrasound examination',
        template: `ULTRASOUND PELVIS

PATIENT NAME: {{patientName}}
AGE/DOB: {{age}}
GENDER: {{gender}}
DATE OF EXAMINATION: {{examDate}}
REFERRING DOCTOR: {{referringDoctor}}

CLINICAL HISTORY:
{{clinicalHistory}}

FINDINGS:

URINARY BLADDER:
Well distended. Wall thickness normal. No calculus/mass/diverticulum seen.

UTERUS (for females):
Anteverted/Retroverted, normal in size.
Measures: ___ x ___ x ___ cm
Endometrial thickness: ___ mm
Myometrium shows normal echotexture. No fibroid/mass seen.

CERVIX:
Normal.

ADNEXA:
Right ovary: Normal in size and echotexture. Measures ___ x ___ cm. No cyst/mass.
Left ovary: Normal in size and echotexture. Measures ___ x ___ cm. No cyst/mass.

PROSTATE (for males):
Normal in size, shape and echotexture.
Measures: ___ x ___ x ___ cm (Volume: ___ cc)
No focal lesion/calcification.

SEMINAL VESICLES (for males):
Normal.

POUCH OF DOUGLAS/RECTOVESICAL POUCH:
No free fluid.

IMPRESSION:
Study within normal limits.

[Additional findings/notes can be added above]

---
RADIOLOGIST: {{doctorName}}
DATE: {{reportDate}}`
    },

    obstetric: {
        id: 'obstetric',
        name: 'Obstetric USG',
        description: 'Pregnancy ultrasound examination',
        template: `OBSTETRIC ULTRASOUND

PATIENT NAME: {{patientName}}
AGE/DOB: {{age}}
GENDER: Female
DATE OF EXAMINATION: {{examDate}}
REFERRING DOCTOR: {{referringDoctor}}

CLINICAL HISTORY:
{{clinicalHistory}}
LMP: ___________
EDD by LMP: ___________

FINDINGS:

UTERUS:
Gravid uterus. Single/Twin live intrauterine gestation.

FETAL BIOMETRY:
BPD: ___ mm
HC: ___ mm
AC: ___ mm
FL: ___ mm

GESTATIONAL AGE: ___ weeks ___ days

FETAL WEIGHT: Approximately ___ grams

PLACENTA:
Located at: Anterior/Posterior/Fundal/Lateral wall
Grade: ___
No evidence of placenta previa.

AMNIOTIC FLUID:
AFI: ___ cm (Normal/Increased/Decreased)

FETAL HEART:
Regular cardiac activity seen. FHR: ___ bpm

FETAL MOVEMENTS:
Present

FETAL PRESENTATION:
Cephalic/Breech/Transverse

CERVIX:
Length: ___ mm. Internal os closed.

IMPRESSION:
Single/Twin live intrauterine pregnancy corresponding to ___ weeks ___ days by biometry.
EDD by USG: ___________

[Additional findings/notes can be added above]

---
RADIOLOGIST: {{doctorName}}
DATE: {{reportDate}}`
    },

    thyroid: {
        id: 'thyroid',
        name: 'Thyroid USG (Small Parts)',
        description: 'Thyroid and neck ultrasound',
        template: `ULTRASOUND THYROID

PATIENT NAME: {{patientName}}
AGE/DOB: {{age}}
GENDER: {{gender}}
DATE OF EXAMINATION: {{examDate}}
REFERRING DOCTOR: {{referringDoctor}}

CLINICAL HISTORY:
{{clinicalHistory}}

FINDINGS:

THYROID GLAND:
Right lobe: Normal in size and echotexture.
Measures: ___ x ___ x ___ cm (AP x TR x CC)
Volume: ___ ml

Left lobe: Normal in size and echotexture.
Measures: ___ x ___ x ___ cm (AP x TR x CC)
Volume: ___ ml

Isthmus: Normal thickness (___ mm)

NODULES/LESIONS:
No discrete nodule/cystic lesion identified.
[Or describe any nodules: Size, location, echogenicity, margins, calcification, vascularity]

LYMPH NODES:
Normal sized lymph nodes in bilateral cervical regions.
No pathological lymphadenopathy.

PARATHYROID:
Not separately visualized (normal finding).

MAJOR VESSELS:
Common carotid arteries and internal jugular veins show normal course and caliber bilaterally.

IMPRESSION:
Normal thyroid gland study.

[Additional findings/notes can be added above]

---
RADIOLOGIST: {{doctorName}}
DATE: {{reportDate}}`
    },

    musculoskeletal: {
        id: 'musculoskeletal',
        name: 'Musculoskeletal USG',
        description: 'MSK ultrasound for joints, tendons, muscles',
        template: `MUSCULOSKELETAL ULTRASOUND

PATIENT NAME: {{patientName}}
AGE/DOB: {{age}}
GENDER: {{gender}}
DATE OF EXAMINATION: {{examDate}}
REFERRING DOCTOR: {{referringDoctor}}

CLINICAL HISTORY:
{{clinicalHistory}}

REGION EXAMINED: [Specify: Shoulder/Knee/Ankle/Wrist/etc.]

FINDINGS:

BONES:
Bony cortex appears smooth and intact.
No fracture/erosion identified.

JOINTS:
Joint space appears normal.
No joint effusion.
Synovial thickness normal.

TENDONS:
Tendons show normal fibrillar echotexture.
No tendon tear/tendinosis/tenosynovitis.

LIGAMENTS:
Ligaments appear intact.
No sprain/tear identified.

MUSCLES:
Normal muscle bulk and echotexture.
No hematoma/tear/mass.

BURSAE:
No bursitis.

SOFT TISSUES:
No significant soft tissue swelling.
No collection/mass.

VASCULARITY:
Normal vascular flow on Doppler study.

IMPRESSION:
Study within normal limits.

[Additional findings/notes can be added above]

---
RADIOLOGIST: {{doctorName}}
DATE: {{reportDate}}`
    }
};

// Function to get all templates
function getAllTemplates() {
    return Object.values(USGTemplates);
}

// Function to get specific template by ID
function getTemplateById(id) {
    return USGTemplates[id] || null;
}

// Function to populate template with patient data
function populateTemplate(templateId, patientData) {
    const template = getTemplateById(templateId);
    if (!template) return '';
    
    let populatedContent = template.template;
    
    // Replace all placeholders with patient data
    Object.keys(patientData).forEach(key => {
        const placeholder = `{{${key}}}`;
        const value = patientData[key] || '';
        populatedContent = populatedContent.replace(new RegExp(placeholder, 'g'), value);
    });
    
    // Add current date as report date if not provided
    if (!patientData.reportDate) {
        const today = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        populatedContent = populatedContent.replace(/{{reportDate}}/g, today);
    }
    
    return populatedContent;
}
