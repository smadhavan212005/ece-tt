/**
 * Department Timetable Generator - Master Data Store
 */
(function(window) {
  'use strict';

  const AppData = {
    branches: [
  {
    "code": 1,
    "name": "ECE",
    "fullName": "Electronics and Communication Engineering"
  },
  {
    "code": 2,
    "name": "VLSI",
    "fullName": "VLSI Design & Technology"
  },
  {
    "code": 3,
    "name": "CSE",
    "fullName": "Computer Science and Engineering"
  },
  {
    "code": 4,
    "name": "EEE",
    "fullName": "Electrical and Electronics Engineering"
  },
  {
    "code": 5,
    "name": "AI & DS",
    "fullName": "Artificial Intelligence and Data Science"
  }
],
    subjects: [
  {
    "code": "EC3552",
    "name": "VLSI and Chip Design",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 5,
    "regulation": "2021"
  },
  {
    "code": "EC3561",
    "name": "VLSI Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 5,
    "defaultLab": "VLSI Lab",
    "continuous": 3,
    "regulation": "2021"
  },
  {
    "code": "VL3401",
    "name": "Digital VLSI Design",
    "category": "Core",
    "defaultType": "Main Course",
    "semester": 4,
    "regulation": "2021"
  },
  {
    "code": "VL3501",
    "name": "CMOS Analog IC Design",
    "category": "Core",
    "defaultType": "Main Course",
    "semester": 5,
    "regulation": "2021"
  },
  {
    "code": "VL3601",
    "name": "Low Power VLSI Design",
    "category": "Core",
    "defaultType": "Main Course",
    "semester": 6,
    "regulation": "2021"
  },
  {
    "code": "VL3611",
    "name": "FPGA and ASIC Design Laboratory",
    "category": "Core",
    "defaultType": "Lab",
    "semester": 6,
    "defaultLab": "VLSI Lab",
    "continuous": 3,
    "regulation": "2021"
  },
  {
    "code": "VL3701",
    "name": "VLSI Testing and Verification",
    "category": "Core",
    "defaultType": "Main Course",
    "semester": 7,
    "regulation": "2021"
  },
  {
    "code": "VL3702",
    "name": "Hardware Description Languages (Verilog/VHDL)",
    "category": "Core",
    "defaultType": "Main Course",
    "semester": 7,
    "regulation": "2021"
  },
  {
    "code": "VL3711",
    "name": "Cadence / Synopsys EDA Lab",
    "category": "Core",
    "defaultType": "Lab",
    "semester": 7,
    "defaultLab": "EDA Lab",
    "continuous": 3,
    "regulation": "2021"
  },
  {
    "code": "IP3151",
    "name": "Induction Programme",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2021"
  },
  {
    "code": "HS3152",
    "name": "Professional English - I",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2021"
  },
  {
    "code": "MA3151",
    "name": "Matrices and Calculus",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2021"
  },
  {
    "code": "PH3151",
    "name": "Engineering Physics",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2021"
  },
  {
    "code": "CY3151",
    "name": "Engineering Chemistry",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2021"
  },
  {
    "code": "GE3151",
    "name": "Problem Solving and Python Programming",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2021"
  },
  {
    "code": "GE3152",
    "name": "Heritage of Tamils",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2021"
  },
  {
    "code": "GE3171",
    "name": "Problem Solving and Python Programming Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 1,
    "regulation": "2021",
    "defaultLab": "Computing Lab",
    "continuous": 3
  },
  {
    "code": "BS3171",
    "name": "Physics and Chemistry Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 1,
    "regulation": "2021",
    "defaultLab": "Physics and Chemistry Laboratory Lab",
    "continuous": 3
  },
  {
    "code": "GE3172",
    "name": "English Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 1,
    "regulation": "2021",
    "defaultLab": "English Laboratory Lab",
    "continuous": 3
  },
  {
    "code": "HS3252",
    "name": "Professional English - II",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2021"
  },
  {
    "code": "MA3251",
    "name": "Statistics and Numerical Methods",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2021"
  },
  {
    "code": "PH3254",
    "name": "Physics for Electronics Engineering",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2021"
  },
  {
    "code": "BE3254",
    "name": "Electrical and Instrumentation Engineering",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2021"
  },
  {
    "code": "GE3251",
    "name": "Engineering Graphics",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2021"
  },
  {
    "code": "EC3251",
    "name": "Circuit Analysis",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2021"
  },
  {
    "code": "GE3252",
    "name": "Tamils and Technology",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2021"
  },
  {
    "code": "SUB27",
    "name": "NCC Credit Course Level 1",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2021"
  },
  {
    "code": "GE3271",
    "name": "Engineering Practices Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 2,
    "regulation": "2021",
    "defaultLab": "Engineering Practices Laboratory Lab",
    "continuous": 3
  },
  {
    "code": "EC3271",
    "name": "Circuits Analysis Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 2,
    "regulation": "2021",
    "defaultLab": "Communication & Circuits Lab",
    "continuous": 3
  },
  {
    "code": "GE3272",
    "name": "Communication Laboratory / Foreign Language",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 2,
    "regulation": "2021",
    "defaultLab": "Communication & Circuits Lab",
    "continuous": 3
  },
  {
    "code": "MA3355",
    "name": "Random Processes and Linear Algebra",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2021"
  },
  {
    "code": "CS3353",
    "name": "C Programming and Data Structures",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2021"
  },
  {
    "code": "EC3354",
    "name": "Signals and Systems",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2021"
  },
  {
    "code": "EC3353",
    "name": "Electronic Devices and Circuits",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2021"
  },
  {
    "code": "EC3351",
    "name": "Control Systems",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2021"
  },
  {
    "code": "EC3352",
    "name": "Digital Systems Design",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2021"
  },
  {
    "code": "EC3361",
    "name": "Electronic Devices and Circuits Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 2,
    "regulation": "2021",
    "defaultLab": "Communication & Circuits Lab",
    "continuous": 3
  },
  {
    "code": "CS3362",
    "name": "C Programming and Data Structures Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 2,
    "regulation": "2021",
    "defaultLab": "Computing Lab",
    "continuous": 3
  },
  {
    "code": "GE3361",
    "name": "Professional Development",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2021"
  },
  {
    "code": "EC3452",
    "name": "Electromagnetic Fields",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2021"
  },
  {
    "code": "EC3401",
    "name": "Networks and Security",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2021"
  },
  {
    "code": "EC3451",
    "name": "Linear Integrated Circuits",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2021"
  },
  {
    "code": "EC3492",
    "name": "Digital Signal Processing",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2021"
  },
  {
    "code": "EC3491",
    "name": "Communication Systems",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2021"
  },
  {
    "code": "GE3451",
    "name": "Environmental Sciences and Sustainability",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2021"
  },
  {
    "code": "SUB46",
    "name": "NCC Credit Course Level 2",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2021"
  },
  {
    "code": "EC3461",
    "name": "Communication Systems Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 1,
    "regulation": "2021",
    "defaultLab": "Communication & Circuits Lab",
    "continuous": 3
  },
  {
    "code": "EC3462",
    "name": "Linear Integrated Circuits Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 1,
    "regulation": "2021",
    "defaultLab": "Communication & Circuits Lab",
    "continuous": 3
  },
  {
    "code": "EC3501",
    "name": "Wireless Communication",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 5,
    "regulation": "2021"
  },
  {
    "code": "EC3551",
    "name": "Transmission Lines and RF Systems",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 5,
    "regulation": "2021"
  },
  {
    "code": "ET3491",
    "name": "Embedded Systems and IOT Design",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 5,
    "regulation": "2021"
  },
  {
    "code": "CS3491",
    "name": "Artificial Intelligence and Machine Learning",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 5,
    "regulation": "2021"
  },
  {
    "code": "GE3791",
    "name": "Human Values and Ethics",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 5,
    "regulation": "2021"
  },
  {
    "code": "EC3711",
    "name": "Summer internship",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 5,
    "regulation": "2021"
  },
  {
    "code": "EC3811",
    "name": "Project Work / Internship",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 5,
    "regulation": "2021"
  },
  {
    "code": "GE3751",
    "name": "Principles of Management",
    "category": "Management Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "GE3752",
    "name": "Total Quality Management",
    "category": "Management Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "GE3753",
    "name": "Engineering Economics and Financial Accounting",
    "category": "Management Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "GE3754",
    "name": "Human Resource Management",
    "category": "Management Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "GE3755",
    "name": "Knowledge Management",
    "category": "Management Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "GE3792",
    "name": "Industrial Management",
    "category": "Management Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "MX3081",
    "name": "Introduction to Women and Gender Studies",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "MX3082",
    "name": "Elements of Literature",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "MX3083",
    "name": "Film Appreciation",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "MX3084",
    "name": "Disaster Risk Reduction and Management",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "MX3085",
    "name": "Well Being with Traditional Practices - Yoga, Ayurveda and Siddha",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Lab",
    "semester": null,
    "regulation": "2021",
    "defaultLab": "Well Being with Traditional Practices - Yoga, Ayurveda and Siddha Lab",
    "continuous": 3
  },
  {
    "code": "MX3086",
    "name": "History of Science and Technology in India",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "MX3087",
    "name": "Political and Economic Thought for a Humane Society",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "MX3088",
    "name": "State, Nation Building and Politics in India",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "MX3089",
    "name": "Industrial Safety",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC363",
    "name": "Wide Bandgap Devices",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC361",
    "name": "Validation and Testing Technology",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC370",
    "name": "Low Power IC Design",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC362",
    "name": "VLSI Testing and Design For Testability",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC342",
    "name": "Mixed Signal IC Design Testing",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC334",
    "name": "Analog IC Design",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC332",
    "name": "Advanced Digital Signal Processing",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC366",
    "name": "Image Processing",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC356",
    "name": "Speech Processing",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC355",
    "name": "Software Defined Radio",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC337",
    "name": "DSP Architecture and Programming",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CCS338",
    "name": "Computer Vision",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC350",
    "name": "RF Transceivers",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC353",
    "name": "Signal Integrity",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC335",
    "name": "Antenna Design",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC341",
    "name": "MICs and RF System Design",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC338",
    "name": "EMI/EMC Pre-Compliance Testing",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC349",
    "name": "RFID System Design and Testing",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CBM370",
    "name": "Wearable Devices",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CBM352",
    "name": "Human Assist Devices",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CBM368",
    "name": "Therapeutic Equipment",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CBM355",
    "name": "Medical Imaging Systems",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CBM342",
    "name": "Brain Computer Interface and Applications",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CBM341",
    "name": "Body Area Networks",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC359",
    "name": "Underwater Instrumentation System",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC358",
    "name": "Underwater Imaging Systems and Image Processing",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC357",
    "name": "Underwater Communication",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC344",
    "name": "Ocean Observation Systems",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC360",
    "name": "Underwater Navigation Systems",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC343",
    "name": "Ocean Acoustics",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC369",
    "name": "IoT Processors",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC368",
    "name": "IoT Based Systems Design",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC365",
    "name": "Wireless Sensor Network Design",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC367",
    "name": "Industrial IoT and Industry 4.0",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC340",
    "name": "MEMS Design",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC339",
    "name": "Fundamentals of Nanoelectronics",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC347",
    "name": "Radar Technologies",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC336",
    "name": "Avionics Systems",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC346",
    "name": "Positioning and Navigation Systems",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC352",
    "name": "Satellite Communication",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC348",
    "name": "Remote Sensing",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC351",
    "name": "Rocketry and Space Mechanics",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC345",
    "name": "Optical Communication & Networks",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC364",
    "name": "Wireless Broad Band Networks",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC331",
    "name": "4G/5G Communication Networks",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC354",
    "name": "Software Defined Networks",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC371",
    "name": "Massive MIMO Networks",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CEC333",
    "name": "Advanced Wireless Communication Techniques",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OAS351",
    "name": "Space Science",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OIE351",
    "name": "Introduction to Industrial Engineering",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OBT351",
    "name": "Food, Nutrition and Health",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OCE351",
    "name": "Environmental and Social Impact Assessment",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OEE351",
    "name": "Renewable Energy System",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OEI351",
    "name": "Introduction to Industrial Instrumentation and Control",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OMA351",
    "name": "Graph Theory",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CCS355",
    "name": "Neural Networks and Deep Learning",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CCW332",
    "name": "Digital Marketing",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OIE352",
    "name": "Resource Management Techniques",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OMG351",
    "name": "Fintech Regulation",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OFD351",
    "name": "Holistic Nutrition",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "AI3021",
    "name": "IT in Agricultural System",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OEI352",
    "name": "Introduction to Control Engineering",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OPY351",
    "name": "Pharmaceutical Nanotechnology",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OAE351",
    "name": "Aviation Management",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CCS342",
    "name": "DevOps",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CCS361",
    "name": "Robotic Process Automation",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OHS351",
    "name": "English for Competitive Examinations",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OMG352",
    "name": "NGOs and Sustainable Development",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OMG353",
    "name": "Democracy and Good Governance",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CME365",
    "name": "Renewable Energy Technologies",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OME354",
    "name": "Applied Design Thinking",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "MF3003",
    "name": "Reverse Engineering",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OPR351",
    "name": "Sustainable Manufacturing",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "AU3791",
    "name": "Electric and Hybrid Vehicles",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OAS352",
    "name": "Space Engineering",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OIM351",
    "name": "Industrial Management",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OIE354",
    "name": "Quality Engineering",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OSF351",
    "name": "Fire Safety Engineering",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OML351",
    "name": "Introduction to Non-Destructive Testing",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OMR351",
    "name": "Mechatronics",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "ORA351",
    "name": "Foundation of Robotics",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OAE352",
    "name": "Fundamentals of Aeronautical Engineering",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OGI351",
    "name": "Remote Sensing Concepts",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OAI351",
    "name": "Urban Agriculture",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OEN351",
    "name": "Drinking Water Supply and Treatment",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OEE352",
    "name": "Electric Vehicle Technology",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OEI353",
    "name": "Introduction to PLC Programming",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OCH351",
    "name": "Nano Technology",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OCH352",
    "name": "Functional Materials",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OFD352",
    "name": "Traditional Indian Foods",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OFD353",
    "name": "Introduction to Food Processing",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OPY352",
    "name": "IPR for Pharma Industry",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OTT351",
    "name": "Basics of Textile Finishing",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OTT352",
    "name": "Industrial Engineering for Garment Industry",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OTT353",
    "name": "Basics of Textile Manufacture",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OPE351",
    "name": "Introduction to Petroleum Refining and Petrochemicals",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CPE334",
    "name": "Energy Conservation and Management",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OPT351",
    "name": "Basics of Plastics Processing",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CBM348",
    "name": "Foundation Skills in Integrated Product Development",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CBM333",
    "name": "Assistive Technology",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OMA352",
    "name": "Operations Research",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OMA353",
    "name": "Algebra and Number Theory",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OMA354",
    "name": "Linear Algebra",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OCE353",
    "name": "Lean Concepts, Tools and Practices",
    "category": "Open Elective",
    "defaultType": "Lab",
    "semester": null,
    "regulation": "2021",
    "defaultLab": "Lean Concepts, Tools and Practices Lab",
    "continuous": 3
  },
  {
    "code": "OBT352",
    "name": "Basics of Microbial Technology",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OBT353",
    "name": "Basics of Biomolecules",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OBT354",
    "name": "Fundamentals of Cell and Molecular Biology",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OHS352",
    "name": "Project Report Writing",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OMA355",
    "name": "Advanced Numerical Methods",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OMA356",
    "name": "Random Processes",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OMA357",
    "name": "Queuing and Reliability Modelling",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OMG354",
    "name": "Production and Operations Management for Entrepreneurs",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OMG355",
    "name": "Multivariate Data Analysis",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OME352",
    "name": "Additive Manufacturing",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CME343",
    "name": "New Product Development",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OME355",
    "name": "Industrial Design & Rapid Prototyping Techniques",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "MF3010",
    "name": "Micro and Precision Engineering",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OMF354",
    "name": "Cost Management of Engineering Projects",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "AU3002",
    "name": "Batteries and Management System",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "AU3008",
    "name": "Sensors and Actuators",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OAS353",
    "name": "Space Vehicles",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OIM352",
    "name": "Management Science",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OIM353",
    "name": "Production Planning and Control",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OIE353",
    "name": "Operations Management",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OSF352",
    "name": "Industrial Hygiene",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OSF353",
    "name": "Chemical Process Safety",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OML352",
    "name": "Electrical, Electronic and Magnetic materials",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OML353",
    "name": "Nanomaterials and applications",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OMR352",
    "name": "Hydraulics and Pneumatics",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OMR353",
    "name": "Sensors",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "ORA352",
    "name": "Concepts in Mobile Robots",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "MV3501",
    "name": "Marine Propulsion",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OMV351",
    "name": "Marine Merchant Vessels",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OMV352",
    "name": "Elements of Marine Engineering",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CRA332",
    "name": "Drone Technologies",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OGI352",
    "name": "Geographical Information System",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OAI352",
    "name": "Agriculture Entrepreneurship Development",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OEN352",
    "name": "Biodiversity Conservation",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OEE353",
    "name": "Introduction to control systems",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OEI354",
    "name": "Introduction to Industrial Automation Systems",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OCH353",
    "name": "Energy Technology",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OCH354",
    "name": "Surface Science",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OFD354",
    "name": "Fundamentals of Food Engineering",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OFD355",
    "name": "Food Safety and Quality Regulations",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OPY353",
    "name": "Nutraceuticals",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OTT354",
    "name": "Basics of Dyeing and Printing",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "FT3201",
    "name": "Fibre Science",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OTT355",
    "name": "Garment Manufacturing Technology",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OPE353",
    "name": "Industrial safety",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OPE354",
    "name": "Unit Operations in Petro Chemical Industries",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OPT352",
    "name": "Plastic Materials for Engineers",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OPT353",
    "name": "Properties and Testing of Plastics",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "CBM356",
    "name": "Medical Informatics",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OCE354",
    "name": "Basics of Integrated Water Resources Management",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OBT355",
    "name": "Biotechnology for Waste Management",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OBT356",
    "name": "Lifestyle Diseases",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "OBT357",
    "name": "Biotechnology in Health Care",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2021"
  },
  {
    "code": "25MA101",
    "name": "Calculus and its Applications",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2025"
  },
  {
    "code": "25PH103",
    "name": "Physics for Electrical Engineering",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2025"
  },
  {
    "code": "25CY102",
    "name": "Chemistry for Electronics Engineering",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2025"
  },
  {
    "code": "25EC101",
    "name": "Problem Solving and C Programming",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2025"
  },
  {
    "code": "25HS101",
    "name": "English Language Proficiency",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2025"
  },
  {
    "code": "25HS102",
    "name": "Heritage of Tamils",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2025"
  },
  {
    "code": "25GE111",
    "name": "Design Thinking for Innovation",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2025"
  },
  {
    "code": "25GE112",
    "name": "Engineering Graphics",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2025"
  },
  {
    "code": "25BS112",
    "name": "Basic Sciences Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 1,
    "regulation": "2025",
    "defaultLab": "Basic Sciences Laboratory Lab",
    "continuous": 3
  },
  {
    "code": "25GEM01",
    "name": "Induction Programme",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": 1,
    "regulation": "2025"
  },
  {
    "code": "25MA201",
    "name": "Complex Variables and Transforms",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2025"
  },
  {
    "code": "25PH204",
    "name": "Sensors for Engineering Applications",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2025"
  },
  {
    "code": "25EC201",
    "name": "Electron Devices",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2025"
  },
  {
    "code": "25EC202",
    "name": "Network Analysis",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2025"
  },
  {
    "code": "25EC203",
    "name": "Object Oriented Programming with Python",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2025"
  },
  {
    "code": "25HS201",
    "name": "Tamils and Technology",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2025"
  },
  {
    "code": "25EC211",
    "name": "Devices and Circuits Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 2,
    "regulation": "2025",
    "defaultLab": "Communication & Circuits Lab",
    "continuous": 3
  },
  {
    "code": "25EEC01",
    "name": "Workplace Communication Skills",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2025"
  },
  {
    "code": "25GEM02",
    "name": "Activity Point Programme I",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": 2,
    "regulation": "2025"
  },
  {
    "code": "25MA304",
    "name": "Matrix Theory and Numerical Methods",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 3,
    "regulation": "2025"
  },
  {
    "code": "25EC301",
    "name": "Analog Electronics",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 3,
    "regulation": "2025"
  },
  {
    "code": "25EC302",
    "name": "Digital Electronics",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 3,
    "regulation": "2025"
  },
  {
    "code": "25EC303",
    "name": "Electromagnetic Fields and Waves",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 3,
    "regulation": "2025"
  },
  {
    "code": "25HS301",
    "name": "Project and Finance Management",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 3,
    "regulation": "2025"
  },
  {
    "code": "25EC311",
    "name": "Analog Electronics Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 3,
    "regulation": "2025",
    "defaultLab": "Analog Electronics Laboratory Lab",
    "continuous": 3
  },
  {
    "code": "25EC312",
    "name": "Digital Electronics Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 3,
    "regulation": "2025",
    "defaultLab": "Digital Electronics Laboratory Lab",
    "continuous": 3
  },
  {
    "code": "25EEC02",
    "name": "Foundations of Problem Solving",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 3,
    "regulation": "2025"
  },
  {
    "code": "25GEM03",
    "name": "Activity Point Programme II",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": 3,
    "regulation": "2025"
  },
  {
    "code": "25MA404",
    "name": "Probability and Random Processes",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 4,
    "regulation": "2025"
  },
  {
    "code": "25EC401",
    "name": "Linear Integrated Circuits",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 4,
    "regulation": "2025"
  },
  {
    "code": "25EC402",
    "name": "Signals and Systems",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 4,
    "regulation": "2025"
  },
  {
    "code": "25EC403",
    "name": "Computer Architecture",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 4,
    "regulation": "2025"
  },
  {
    "code": "25EC404",
    "name": "Data Structures and Algorithms",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 4,
    "regulation": "2025"
  },
  {
    "code": "25EC411",
    "name": "Linear Integrated Circuits Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 4,
    "regulation": "2025",
    "defaultLab": "Communication & Circuits Lab",
    "continuous": 3
  },
  {
    "code": "25EC412",
    "name": "Signals and Systems Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 4,
    "regulation": "2025",
    "defaultLab": "DSP Lab",
    "continuous": 3
  },
  {
    "code": "25ECE01",
    "name": "Mini Project I",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 4,
    "regulation": "2025"
  },
  {
    "code": "25EEC03",
    "name": "Problem Solving",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 4,
    "regulation": "2025"
  },
  {
    "code": "25GEM04",
    "name": "Activity Point Programme III",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": 4,
    "regulation": "2025"
  },
  {
    "code": "25EC501",
    "name": "Analog Communication",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 5,
    "regulation": "2025"
  },
  {
    "code": "25EC502",
    "name": "Embedded Systems",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 5,
    "regulation": "2025"
  },
  {
    "code": "25EC503",
    "name": "Control Systems",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 5,
    "regulation": "2025"
  },
  {
    "code": "25EC504",
    "name": "Computer Networks",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 5,
    "regulation": "2025"
  },
  {
    "code": "25EC505",
    "name": "Antennas and Wave Propagation",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 5,
    "regulation": "2025"
  },
  {
    "code": "25EC511",
    "name": "Analog Communication Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 5,
    "regulation": "2025",
    "defaultLab": "Communication & Circuits Lab",
    "continuous": 3
  },
  {
    "code": "25EC512",
    "name": "Embedded Systems Design Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 5,
    "regulation": "2025",
    "defaultLab": "Embedded Systems Design Laboratory Lab",
    "continuous": 3
  },
  {
    "code": "25ECE02",
    "name": "Internship I",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 5,
    "regulation": "2025"
  },
  {
    "code": "25ECE03",
    "name": "Community Project",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 5,
    "regulation": "2025"
  },
  {
    "code": "25EEC04",
    "name": "Aptitude Skills",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 5,
    "regulation": "2025"
  },
  {
    "code": "25GEM05",
    "name": "Activity Point Programme IV",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": 5,
    "regulation": "2025"
  },
  {
    "code": "25EC601",
    "name": "Digital Signal Processing",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 6,
    "regulation": "2025"
  },
  {
    "code": "25EC602",
    "name": "Digital Communication",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 6,
    "regulation": "2025"
  },
  {
    "code": "25EC603",
    "name": "VLSI Design",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 6,
    "regulation": "2025"
  },
  {
    "code": "25EC611",
    "name": "Digital Signal Processing Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 6,
    "regulation": "2025",
    "defaultLab": "DSP Lab",
    "continuous": 3
  },
  {
    "code": "25EC612",
    "name": "VLSI Design Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 6,
    "regulation": "2025",
    "defaultLab": "VLSI Lab",
    "continuous": 3
  },
  {
    "code": "25EC613",
    "name": "Digital Communication Engineering Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 6,
    "regulation": "2025",
    "defaultLab": "Communication & Circuits Lab",
    "continuous": 3
  },
  {
    "code": "25ECE04",
    "name": "Mini Project II",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 6,
    "regulation": "2025"
  },
  {
    "code": "25EEC05",
    "name": "Enhancing Problem Solving Ability with Code",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 6,
    "regulation": "2025"
  },
  {
    "code": "25GEM06",
    "name": "Activity Point Programme V",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": 6,
    "regulation": "2025"
  },
  {
    "code": "25EC701",
    "name": "RF Passive and Active Circuits",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 7,
    "regulation": "2025"
  },
  {
    "code": "25EC711",
    "name": "RF and Microwave Engineering Laboratory",
    "category": "Compulsory",
    "defaultType": "Lab",
    "semester": 7,
    "regulation": "2025",
    "defaultLab": "Communication & Circuits Lab",
    "continuous": 3
  },
  {
    "code": "25ECE05",
    "name": "Project Work I",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 7,
    "regulation": "2025"
  },
  {
    "code": "25ECE06",
    "name": "Internship II",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 7,
    "regulation": "2025"
  },
  {
    "code": "25ECE07",
    "name": "Project Work II",
    "category": "Compulsory",
    "defaultType": "Main Course",
    "semester": 8,
    "regulation": "2025"
  },
  {
    "code": "25ECP01",
    "name": "Mixed Signal IC Design",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP02",
    "name": "CAD for VLSI",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP03",
    "name": "Low Power IC Design",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP04",
    "name": "VLSI Signal Processing",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP05",
    "name": "CMOS Analog IC Design",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP06",
    "name": "VLSI Testing and Design for Testability",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP07",
    "name": "Digital Design Verification",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP08",
    "name": "VLSI Architectures for AI Applications",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP11",
    "name": "Advanced Digital Signal Processing",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP12",
    "name": "Digital Image Processing",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP13",
    "name": "Speech Processing",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP14",
    "name": "Software Defined Radio",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP15",
    "name": "Wavelets and its applications",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP16",
    "name": "Biomedical Signal Processing",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP17",
    "name": "5G and Beyond",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP18",
    "name": "Mobile Communication",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP21",
    "name": "Real Time Operating Systems",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP22",
    "name": "IoT based System Design",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP23",
    "name": "Artificial IoT",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP24",
    "name": "Industrial Internet of Things and Industry 4.0",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP25",
    "name": "FPGA Based Embedded Systems",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP26",
    "name": "Robotics",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP27",
    "name": "Wearable Devices",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP28",
    "name": "IoT Processors",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP31",
    "name": "IC Packaging and Electro Magnetic Interference and Compatibility",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP32",
    "name": "Quantum Computing",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP33",
    "name": "Artificial Intelligence and Machine Learning",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP34",
    "name": "Natural Language Processing",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP35",
    "name": "Computer and Machine Vision",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP36",
    "name": "Avionics",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP37",
    "name": "Cryptography and Network Security",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECP38",
    "name": "Information Theory and Coding",
    "category": "Professional Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECM01",
    "name": "Digital System Design",
    "category": "Minor Degree Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECM02",
    "name": "Microprocessors and Microcontrollers",
    "category": "Minor Degree Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECM03",
    "name": "Embedded Systems Architecture",
    "category": "Minor Degree Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECM04",
    "name": "IoT based System Design",
    "category": "Minor Degree Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECM05",
    "name": "IoT Processors",
    "category": "Minor Degree Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECM06",
    "name": "Industrial IoT and Industry 4.0",
    "category": "Minor Degree Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECM07",
    "name": "Robotics",
    "category": "Minor Degree Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECM08",
    "name": "Mechatronics",
    "category": "Minor Degree Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECO01",
    "name": "VLSI Technology",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECO02",
    "name": "Microcontroller Based System Design",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECO03",
    "name": "Mechatronics",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECO04",
    "name": "IoT Architecture and Prototypes",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECO05",
    "name": "Digital Image Processing",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25ECO06",
    "name": "Nano Technology",
    "category": "Open Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25EC901",
    "name": "System Verilog Testbenches",
    "category": "One-Credit Course",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25EC902",
    "name": "Universal Verification Methodology",
    "category": "One-Credit Course",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25EC903",
    "name": "Quantum Computing Fundamentals",
    "category": "One-Credit Course",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25EC904",
    "name": "Quantum Cryptography",
    "category": "One-Credit Course",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25EC905",
    "name": "Firmware and Silicon Co-Design for SOC Systems",
    "category": "One-Credit Course",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25EC906",
    "name": "Linux and Scripting for Chip Design Engineers",
    "category": "One-Credit Course",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25EC907",
    "name": "High-Level Synthesis (HLS) For FPGA and ASIC Design",
    "category": "One-Credit Course",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25EC908",
    "name": "Physical Design of VLSI Circuits",
    "category": "One-Credit Course",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25EC909",
    "name": "Advanced Verilog-A and Verilog-AMS Modeling",
    "category": "One-Credit Course",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25EC910",
    "name": "Semiconductor Product Engineering",
    "category": "One-Credit Course",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25EC911",
    "name": "RISC-V CPU Design",
    "category": "One-Credit Course",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25EC912",
    "name": "RTL Synthesis and Scan Insertion Using Fusion Compiler",
    "category": "One-Credit Course",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25EC913",
    "name": "ATPG and Simulation Using EDA Tools",
    "category": "One-Credit Course",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25EC914",
    "name": "IoT Using LoRaWAN Technology",
    "category": "One-Credit Course",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25EC915",
    "name": "Servo Motion Tuning Techniques – Industrial Applications",
    "category": "One-Credit Course",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25EC916",
    "name": "Digitalization of Manufacturing",
    "category": "One-Credit Course",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25EC917",
    "name": "AI in Manufacturing - Industrial Applications",
    "category": "One-Credit Course",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25HS211",
    "name": "Communication Skills for Engineers",
    "category": "Language Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25HS212",
    "name": "Basic German",
    "category": "Language Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25HS213",
    "name": "Basic Japanese",
    "category": "Language Elective",
    "defaultType": "Elective Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25MC001",
    "name": "Environmental Science",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25MC002",
    "name": "Indian Constitution",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25MC003",
    "name": "Industrial Safety",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25MC004",
    "name": "Disaster Risk Reduction and Management",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25MC005",
    "name": "Indian Knowledge System for Sustainable Human Development",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25MC006",
    "name": "Strategic Data Management and Governance",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25MC007",
    "name": "Professional Ethics",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25HSO01",
    "name": "Physical Education",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  },
  {
    "code": "25HSO02",
    "name": "Yoga and Health",
    "category": "Mandatory / Non-Credit",
    "defaultType": "Main Course",
    "semester": null,
    "regulation": "2025"
  }
],
    facultyData: {
  "departments": {
    "VLSI": [
      {
        "id": "FAC_VLSI_1",
        "name": "Dr. P. Vijayakumar",
        "department": "VLSI",
        "designation": "Professor & HoD",
        "specialization": "VLSI (Low Power), Automation",
        "email": "pvk@psgitech.ac.in"
      },
      {
        "id": "FAC_VLSI_2",
        "name": "Dr. M. Jayasanthi",
        "department": "VLSI",
        "designation": "Professor",
        "specialization": "ASIC Design & Signal Processing",
        "email": "jayasanthiranjith@psgitech.ac.in"
      },
      {
        "id": "FAC_VLSI_3",
        "name": "Dr. S. Sridevi Sathya Priya",
        "department": "VLSI",
        "designation": "Associate Professor",
        "specialization": "VLSI, FPGA Hardware Security",
        "email": "sridevi.ec@psgitech.ac.in"
      },
      {
        "id": "FAC_VLSI_4",
        "name": "Dr. S. Padmapriya",
        "department": "VLSI",
        "designation": "Assistant Professor (Sl.G)",
        "specialization": "Low Power VLSI, Reconfigurable Architectures",
        "email": "padmapriya@psgitech.ac.in"
      },
      {
        "id": "FAC_VLSI_5",
        "name": "Dr. M. Deepa",
        "department": "VLSI",
        "designation": "Assistant Professor (Sl.G)",
        "specialization": "Digital Design and VLSI Design",
        "email": "deepa@psgitech.ac.in"
      },
      {
        "id": "FAC_VLSI_6",
        "name": "Dr. K. Paldurai",
        "department": "VLSI",
        "designation": "Assistant Professor (Sl.G)",
        "specialization": "Digital Arithmetic Circuit Design, Mixed Signal IC",
        "email": "paldurai.k@psgitech.ac.in"
      },
      {
        "id": "FAC_VLSI_7",
        "name": "Dr. J. R. Dinesh Kumar",
        "department": "VLSI",
        "designation": "Assistant Professor (Sl.G)",
        "specialization": "VLSI, Low Power Architectures",
        "email": "dineshkumar.ec@psgitech.ac.in"
      },
      {
        "id": "FAC_VLSI_8",
        "name": "Dr. M. Priyadharshini",
        "department": "VLSI",
        "designation": "Assistant Professor",
        "specialization": "Hardware Security, VLSI Design, AI",
        "email": "priyadharshini.ec@psgitech.ac.in"
      }
    ],
    "ECE": [
      {
        "id": "FAC_ECE_101",
        "name": "Dr. P. Vijayakumar",
        "department": "ECE",
        "designation": "Professor & HoD",
        "specialization": "VLSI (Low Power), Automation",
        "email": "pvk@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_102",
        "name": "Dr. M. Jayasanthi",
        "department": "ECE",
        "designation": "Professor",
        "specialization": "ASIC Design and Signal processing",
        "email": "jayasanthiranjith@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_103",
        "name": "Dr. C. Arvind",
        "department": "ECE",
        "designation": "Professor",
        "specialization": "Signal Processing & Communication Systems",
        "email": "arvind@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_104",
        "name": "Dr. G. Santhanamari",
        "department": "ECE",
        "designation": "Associate Professor",
        "specialization": "Image Processing, Embedded systems",
        "email": "gsm@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_105",
        "name": "Dr. D. Selvakumar",
        "department": "ECE",
        "designation": "Associate Professor",
        "specialization": "Nanoelectronics, Embedded systems",
        "email": "selvakumar@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_106",
        "name": "Dr. B. A. Sapna",
        "department": "ECE",
        "designation": "Associate Professor",
        "specialization": "Communication Systems",
        "email": "sapna.ec@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_107",
        "name": "Dr. S. Sridevi Sathya Priya",
        "department": "ECE",
        "designation": "Associate Professor",
        "specialization": "VLSI, FPGA based Hardware Security, Cryptographic Hardware Architecture , PUF based Security Systems",
        "email": "sridevi.ec@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_108",
        "name": "Dr. S. Padmapriya",
        "department": "ECE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Low Power VLSI, Reconfigurable Architectures, Signal Processing and Computer Vision",
        "email": "padmapriya@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_109",
        "name": "Dr. M. Jothibasu",
        "department": "ECE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Digital Signal Processing, Image processing",
        "email": "jothibasu@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_110",
        "name": "Dr. M. Deepa",
        "department": "ECE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Digital Design and VLSI Design",
        "email": "deepa@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_111",
        "name": "Dr. K. Paldurai",
        "department": "ECE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Digital Arithmetic Circuit Design, Mixed Signal IC Design",
        "email": "paldurai.k@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_112",
        "name": "Dr. T. Pravinraj",
        "department": "ECE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "MEMS, VLSI Process Technology, Solver Development",
        "email": "pravinraj@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_113",
        "name": "Dr. P. Sridhar",
        "department": "ECE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Signal Processing, Image Processing, Computer Vision",
        "email": "sridhar.p@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_114",
        "name": "Dr. S. P. Cowsigan",
        "department": "ECE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "RF, Microwave and Antenna Design",
        "email": "cowsigan@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_115",
        "name": "Dr. J. S. Sujin",
        "department": "ECE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Image Processing, Signal Processing, Robotics",
        "email": "sujin@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_116",
        "name": "Dr. P. Sakthivel",
        "department": "ECE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Wireless Technologies",
        "email": "drspvel.ec@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_117",
        "name": "Dr. J. R. Dinesh Kumar",
        "department": "ECE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "VLSI, Low Power Architectures, Biomedical Signal Processing and Machine Learning",
        "email": "dineshkumar.ec@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_118",
        "name": "Dr. B. Tharini",
        "department": "ECE",
        "designation": "Assistant Professor",
        "specialization": "MIMO Antennas, Wireless Communication",
        "email": "tharini@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_119",
        "name": "Dr. M. Priyadharshini",
        "department": "ECE",
        "designation": "Assistant Professor",
        "specialization": "Hardware Security, VLSI Design, AI",
        "email": "priyadharshini.ec@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_120",
        "name": "Dr. S. Jayanthi Sree",
        "department": "ECE",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Biomedical Image Processing, VLSI Design, ML",
        "email": "jayanthisree@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_121",
        "name": "Mr. R. RajaRaja",
        "department": "ECE",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "VLSI Design",
        "email": "rajaraja@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_122",
        "name": "Ms. N. Susithra",
        "department": "ECE",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "VLSI Design, VLSI Signal Processing",
        "email": "susithra@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_123",
        "name": "Dr. M. Sowmiya",
        "department": "ECE",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Communication Systems, Biomedical Signal Processing, Machine Learning",
        "email": "sowmiya@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_124",
        "name": "Ms. D.Archana",
        "department": "ECE",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Applied Electronics",
        "email": "archana@psgitech.ac.in"
      },
      {
        "id": "FAC_ECE_125",
        "name": "Dr. N. Iswarya",
        "department": "ECE",
        "designation": "Assistant Professor",
        "specialization": "Communication Systems",
        "email": "iswarya@psgitech.ac.in"
      }
    ],
    "CSE": [
      {
        "id": "FAC_CSE_126",
        "name": "Dr. B. Gomathy",
        "department": "CSE",
        "designation": "Professor & HOD (i/c)",
        "specialization": "Data Analytics",
        "email": "drgomathy@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_127",
        "name": "Dr. R. Manimegalai",
        "department": "CSE",
        "designation": "Professor",
        "specialization": "Distributed Computing VLSI Algorithms, IoT and Security",
        "email": "drrm@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_128",
        "name": "Dr. S. Kalarani",
        "department": "CSE",
        "designation": "HoD (i/c)",
        "specialization": "Cloud Computing, Deep Learning",
        "email": "kalarani@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_129",
        "name": "Dr. R. Manjula Devi",
        "department": "CSE",
        "designation": "Professor",
        "specialization": "Machine Learning, Image Processing, Soft Computing, AI",
        "email": "manjuladevi.cs@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_130",
        "name": "Mr. V. Harikrishnan",
        "department": "CSE",
        "designation": "Professor of Practice",
        "specialization": "Project Management, ERP",
        "email": "harikrishnan.cs@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_131",
        "name": "Dr. I. Kala",
        "department": "CSE",
        "designation": "Associate Professor",
        "specialization": "Mobile AdHoc Network and Database Management System",
        "email": "kala@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_132",
        "name": "Dr. K. Malarvizhi",
        "department": "CSE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Machine Learning, Deep Learning",
        "email": "malarvizhi@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_133",
        "name": "Dr. T. Kalai Selvi",
        "department": "CSE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Internet of Things (IoT), Data Management",
        "email": "tks.cs@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_134",
        "name": "Dr. M. N. Kavitha",
        "department": "CSE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Machine Learning, Deep Learning & Operating System",
        "email": "kavitha@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_135",
        "name": "Dr. A. Sunitha Nandhini",
        "department": "CSE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Artifical Intelligence, Internet of Things",
        "email": "asn@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_136",
        "name": "Ms. M. Kirubadevi",
        "department": "CSE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Software Engineering",
        "email": "kirubadevi@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_137",
        "name": "Dr. M. Sangeetha",
        "department": "CSE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Deep Learning, Graph Neural Networks",
        "email": "sangeetha.cs@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_138",
        "name": "Dr. M. Karthigha",
        "department": "CSE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Network Security, Augmented Reality & Virtual Reality",
        "email": "karthigha@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_139",
        "name": "Ms. P. Jeevitha",
        "department": "CSE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Machine Learning",
        "email": "jeevithap@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_140",
        "name": "Dr. S. S. Saranya",
        "department": "CSE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Security, Blockchain",
        "email": "saranya@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_141",
        "name": "Dr. Sathya Balaji",
        "department": "CSE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Machine Learning, Artificial Intelligence",
        "email": "sathyabalaji@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_142",
        "name": "Ms. P. Shanmugapriya",
        "department": "CSE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "DBMS, Machine Learning , Deep Learning",
        "email": "shanmugapriya@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_143",
        "name": "Lt. V. Vilasini",
        "department": "CSE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Data Science and Data Analytics",
        "email": "vilasini@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_144",
        "name": "Dr. S. Vaishnavi",
        "department": "CSE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Data Science, Machine Learning",
        "email": "vaishnavis@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_145",
        "name": "Dr. V. C. Maha Vishnu",
        "department": "CSE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Video Data Mining and Image Analytics",
        "email": "mvvc@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_146",
        "name": "Ms. P. Gouthami",
        "department": "CSE",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Machine Learning, Deep Learning",
        "email": "gouthami.cs@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_147",
        "name": "Ms. S. Leela",
        "department": "CSE",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Deep Learning",
        "email": "leela.cs@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_148",
        "name": "Mr. B. Ajith Jerom",
        "department": "CSE",
        "designation": "Assistant Professor",
        "specialization": "Data Science and Data Analytics",
        "email": "ajith@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_149",
        "name": "Ms. C. Divya Gowri",
        "department": "CSE",
        "designation": "Assistant Professor",
        "specialization": "Data Mining, Database Management System",
        "email": "divya.cs@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_150",
        "name": "Mr. S. Joemathew",
        "department": "CSE",
        "designation": "Assistant Professor",
        "specialization": "Software Testing, AI Testing",
        "email": "joemathews.cs@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_151",
        "name": "Ms. S. V. Sowthika",
        "department": "CSE",
        "designation": "Assistant Professor",
        "specialization": "Machine Learning, DBMS",
        "email": "sowthika.cs@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_152",
        "name": "Ms. R. Hemapriya",
        "department": "CSE",
        "designation": "Assistant Professor",
        "specialization": "DBMS, Machine Learning",
        "email": "hemapriya.cs@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_153",
        "name": "Dr. B. Gomathi",
        "department": "CSE",
        "designation": "Associate Professor",
        "specialization": "Cloud Computing, Machine Learning, Optimization Techniques",
        "email": "gomathi@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_154",
        "name": "Dr. P. Anantha Prabha",
        "department": "CSE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Deep Learning, Cloud Computing",
        "email": "ap@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_155",
        "name": "Mr. K. S. Giriprasath",
        "department": "CSE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Cyber security, Network Security",
        "email": "giriprasath@psgitech.ac.in"
      },
      {
        "id": "FAC_CSE_156",
        "name": "Dr. G. Sudha Sadasivam",
        "department": "CSE",
        "designation": "Visiting Professor",
        "specialization": "Big Data Analytics, Privacy Preservation",
        "email": ""
      }
    ],
    "AI & DS": [
      {
        "id": "FAC_AI _157",
        "name": "Dr. S. Kalarani",
        "department": "AI & DS",
        "designation": "HoD (i/c)",
        "specialization": "Cloud Computing, Deep Learning",
        "email": "kalarani@psgitech.ac.in"
      },
      {
        "id": "FAC_AI _158",
        "name": "Dr. S. Lokesh",
        "department": "AI & DS",
        "designation": "Professor",
        "specialization": "AI, Human-Computer Interaction, Data Science",
        "email": "lokesh@psgitech.ac.in"
      },
      {
        "id": "FAC_AI _159",
        "name": "Dr. R. Priya Vaijayanthi",
        "department": "AI & DS",
        "designation": "Associate Professor",
        "specialization": "Machine Learning, Deep Learning, Generative AI",
        "email": "rpv.ai@psgitech.ac.in"
      },
      {
        "id": "FAC_AI _160",
        "name": "Dr. S. Sangeetha",
        "department": "AI & DS",
        "designation": "Associate Professor",
        "specialization": "Responsible AI, Deep Learning, Generative AI",
        "email": "sangeetha@psgitech.ac.in"
      },
      {
        "id": "FAC_AI _161",
        "name": "Mr. R. Muthu Kumar",
        "department": "AI & DS",
        "designation": "Associate Professor of Practice",
        "specialization": "DevOps, Technology Modernization",
        "email": "muthukumar.ai@psgitech.ac.in"
      },
      {
        "id": "FAC_AI _162",
        "name": "Mr. C. Santhosh",
        "department": "AI & DS",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Data Science, Big Data Analysis",
        "email": "santhosh@psgitech.ac.in"
      },
      {
        "id": "FAC_AI _163",
        "name": "Ms. S. Dhivya",
        "department": "AI & DS",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Database management systems, Fullstack development, Machine Learning",
        "email": "dhivya.ai@psgitech.ac.in"
      },
      {
        "id": "FAC_AI _164",
        "name": "Ms. G. Suganya",
        "department": "AI & DS",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "DevOps, Soft Computing",
        "email": "suganya@psgitech.ac.in"
      },
      {
        "id": "FAC_AI _165",
        "name": "Ms. P. Gomathi",
        "department": "AI & DS",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Deep Learning, Computer Networks, Data Science",
        "email": "gomathi.ai@psgitech.ac.in"
      },
      {
        "id": "FAC_AI _166",
        "name": "Ms. P. Nirmala Priyadharshini",
        "department": "AI & DS",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Cloud Computing, Object Oriented Programming",
        "email": "nirmala.ai@psgitech.ac.in"
      },
      {
        "id": "FAC_AI _167",
        "name": "Ms. E. Kalaivani",
        "department": "AI & DS",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Machine Learning",
        "email": "kalaivani.ai@psgitech.ac.in"
      },
      {
        "id": "FAC_AI _168",
        "name": "Ms. K. Sathya",
        "department": "AI & DS",
        "designation": "Assistant Professor",
        "specialization": "Machine Learning, Deep Learning",
        "email": "sathya@psgitech.ac.in"
      },
      {
        "id": "FAC_AI _169",
        "name": "Ms. K. Santhiya",
        "department": "AI & DS",
        "designation": "Assistant Professor",
        "specialization": "Data Structures, Machine Learning, Deep Learning",
        "email": "santhiya@psgitech.ac.in"
      },
      {
        "id": "FAC_AI _170",
        "name": "Ms. R. S. Niranjana",
        "department": "AI & DS",
        "designation": "Assistant Professor",
        "specialization": "Deep Learning, Cybersecurity, Data Structures",
        "email": "niranjana@psgitech.ac.in"
      }
    ],
    "EEE": [
      {
        "id": "FAC_EEE_171",
        "name": "Dr. C. S. Subash Kumar",
        "department": "EEE",
        "designation": "Associate Professor & HOD (i/c)",
        "specialization": "Electrical Machines",
        "email": "css@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_172",
        "name": "Dr. C. L. Vasu",
        "department": "EEE",
        "designation": "Professor",
        "specialization": "Embedded Systems",
        "email": "clv@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_173",
        "name": "Dr. E. Malar",
        "department": "EEE",
        "designation": "Professor",
        "specialization": "Biomedical Instrumentation and MI Processing",
        "email": "emr@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_174",
        "name": "Dr. M. Mohamed Iqbal",
        "department": "EEE",
        "designation": "Professor",
        "specialization": "Power System and Renewable Energy",
        "email": "iqbal@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_175",
        "name": "Dr. J. Baskaran",
        "department": "EEE",
        "designation": "Professor",
        "specialization": "Power System Engineering, Distributed Generation, Renewable Energy",
        "email": "baskaran@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_176",
        "name": "Dr. D. Sivakumar",
        "department": "EEE",
        "designation": "Visiting Professor",
        "specialization": "Instrumentation & Process Control",
        "email": "sivakumar@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_177",
        "name": "Dr. N. Bharathi",
        "department": "EEE",
        "designation": "Professor",
        "specialization": "Process Control, Intelligent Controllers",
        "email": "bharathi.ee@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_178",
        "name": "Mr. V. Sivaganesh",
        "department": "EEE",
        "designation": "Professor of Practice",
        "specialization": "Applied Electronics",
        "email": "sivaganesh.v@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_179",
        "name": "Dr. B. Adhavan",
        "department": "EEE",
        "designation": "Associate Professor",
        "specialization": "Power Electronics and Drives",
        "email": "adhavan@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_180",
        "name": "Dr. M. Sathiyanathan",
        "department": "EEE",
        "designation": "Associate Professor",
        "specialization": "Power Electronics.Drives",
        "email": "sathiyangm@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_181",
        "name": "Dr. E. Govinda Kumar",
        "department": "EEE",
        "designation": "Associate Professor",
        "specialization": "Control Systems, Sliding mode control, Controller optimization",
        "email": "govindakumar@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_182",
        "name": "Dr. M. Elenchezhiyan",
        "department": "EEE",
        "designation": "Associate Professor",
        "specialization": "Control & Instrumentation",
        "email": "elen.ee@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_183",
        "name": "Dr. S. Julius Fusic",
        "department": "EEE",
        "designation": "Associate Professor",
        "specialization": "Localization and Navigation of Autonomous Systems",
        "email": "sjf.ee@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_184",
        "name": "Dr. R. Vijay",
        "department": "EEE",
        "designation": "Associate Professor",
        "specialization": "Power Systems Engineering, Applications of AI & ML in EEE, Green Hydrogen, Electric Vehicle Routing",
        "email": "vijay.ee@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_185",
        "name": "Dr. M. Senthilkumar",
        "department": "EEE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Embedded System",
        "email": "senthilkumar@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_186",
        "name": "Mr. S. Ravikrishna",
        "department": "EEE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Electrical Machines",
        "email": "ravikrishna@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_187",
        "name": "Dr. C. V. Pavithra",
        "department": "EEE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Electrical Machines",
        "email": "pavithra@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_188",
        "name": "Dr. B. Suresh",
        "department": "EEE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Power Electronics and Drives",
        "email": "suresh@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_189",
        "name": "Dr. S. Arivoli",
        "department": "EEE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Control Systems and Instrumentation",
        "email": "arivoli@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_190",
        "name": "Dr. A. P. Roger Rozario",
        "department": "EEE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Internet of Things, AI & ML",
        "email": "rogerrozario@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_191",
        "name": "Dr. H. Ramesh",
        "department": "EEE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Electrical Drives and Control, Motion Control Applications, Industry 4.0, Robotics",
        "email": "ramesh.ee@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_192",
        "name": "Dr. K. Bavithra",
        "department": "EEE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Power systems engineering (Restructuring)",
        "email": "bavithra@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_193",
        "name": "Ms. R. Divya",
        "department": "EEE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Power Systems",
        "email": "divya@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_194",
        "name": "Dr. G. Sophia Jasmine",
        "department": "EEE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Power Systems Engineering",
        "email": "sophia.ee@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_195",
        "name": "Dr. S. Karthikeyan",
        "department": "EEE",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Power Electronics and Drives",
        "email": "karthikeyans.ee@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_196",
        "name": "Dr. A. Jeyashree",
        "department": "EEE",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Power Electronics & Drives.Solar Energy",
        "email": "jeyashreea@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_197",
        "name": "Dr. V. R. Kavya",
        "department": "EEE",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Process Control",
        "email": "kavya.ee@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_198",
        "name": "Dr. P. R. Jain Vinith",
        "department": "EEE",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Power System Planning and Operation, Energy Management",
        "email": "jainvinith.ee@psgitech.ac.in"
      },
      {
        "id": "FAC_EEE_199",
        "name": "Mr. V. Srimaheswaran",
        "department": "EEE",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Power Electronics & Drives",
        "email": "srimaheswaran.ee@psgitech.ac.in"
      }
    ],
    "Civil": [
      {
        "id": "FAC_CIV_200",
        "name": "Dr. P. Muthupriya",
        "department": "Civil",
        "designation": "Professor & HoD",
        "specialization": "Structural Engineering",
        "email": "muthupriya@psgitech.ac.in"
      },
      {
        "id": "FAC_CIV_201",
        "name": "Dr. M. I. Abdul Aleem",
        "department": "Civil",
        "designation": "Professor",
        "specialization": "Structural Engineering",
        "email": "aleem@psgitech.ac.in"
      },
      {
        "id": "FAC_CIV_202",
        "name": "Dr. M. Arun",
        "department": "Civil",
        "designation": "Professor",
        "specialization": "Structural Engineering",
        "email": "arun@psgitech.ac.in"
      },
      {
        "id": "FAC_CIV_203",
        "name": "Dr. R. Rajkumar",
        "department": "Civil",
        "designation": "Associate Professor",
        "specialization": "Infrastructure Engineering",
        "email": "rajkumar@psgitech.ac.in"
      },
      {
        "id": "FAC_CIV_204",
        "name": "Dr. V. Navin Ganesh",
        "department": "Civil",
        "designation": "Associate Professor",
        "specialization": "Transportation Engineering and Management",
        "email": "navinganesh@psgitech.ac.in"
      },
      {
        "id": "FAC_CIV_205",
        "name": "Mr. S. Elayaraja",
        "department": "Civil",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Geotechnical Engineering",
        "email": "elayaraja@psgitech.ac.in"
      },
      {
        "id": "FAC_CIV_206",
        "name": "Dr. M. R. Ezhil Kumar",
        "department": "Civil",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Environmental Management",
        "email": "ezhilkumar@psgitech.ac.in"
      },
      {
        "id": "FAC_CIV_207",
        "name": "Mr. P. Balakumar",
        "department": "Civil",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Infrastructure Engineering",
        "email": "pbkciv@psgitech.ac.in"
      },
      {
        "id": "FAC_CIV_208",
        "name": "Dr. J. Karthick",
        "department": "Civil",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Structural Engineering",
        "email": "karthick@psgitech.ac.in"
      },
      {
        "id": "FAC_CIV_209",
        "name": "Dr. K. Govarthanambikai",
        "department": "Civil",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Infrastructure Engineering",
        "email": "kgk@psgitech.ac.in"
      },
      {
        "id": "FAC_CIV_210",
        "name": "Ms. V. Selvapriya",
        "department": "Civil",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Structural Engineering",
        "email": "vsp@psgitech.ac.in"
      },
      {
        "id": "FAC_CIV_211",
        "name": "Mr. K. Sakthi Prasanth",
        "department": "Civil",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Structural Engineering",
        "email": "ksp@psgitech.ac.in"
      },
      {
        "id": "FAC_CIV_212",
        "name": "Ms. R. Nidhya",
        "department": "Civil",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Structural Engineering",
        "email": "nidhya@psgitech.ac.in"
      },
      {
        "id": "FAC_CIV_213",
        "name": "Dr. P. A. Sivasubramani",
        "department": "Civil",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Infrastructure Engineer",
        "email": "sivasubramani@psgitech.ac.in"
      },
      {
        "id": "FAC_CIV_214",
        "name": "Dr. R. Balaji",
        "department": "Civil",
        "designation": "Assistant Professor",
        "specialization": "Environmental Engineering",
        "email": "balaji.civil@psgitech.ac.in"
      },
      {
        "id": "FAC_CIV_215",
        "name": "Dr. N. Divyah",
        "department": "Civil",
        "designation": "Assistant Professor",
        "specialization": "Structural Engineering",
        "email": "divyah@psgitech.ac.in"
      }
    ],
    "Mathematics": [
      {
        "id": "FAC_MAT_216",
        "name": "Dr. S. Aramuthakannan",
        "department": "Mathematics",
        "designation": "Professor & HoD (i/c)",
        "specialization": "Optimization Techniques",
        "email": "sakannan@psgitech.ac.in"
      },
      {
        "id": "FAC_MAT_217",
        "name": "Dr. M. Venkatesan",
        "department": "Mathematics",
        "designation": "Professor",
        "specialization": "Solid Mechanics",
        "email": "coe@psgitech.ac.in"
      },
      {
        "id": "FAC_MAT_218",
        "name": "Dr. R. S. Sankara Subramanian",
        "department": "Mathematics",
        "designation": "Professor",
        "specialization": "Cryptography",
        "email": "rss@psgitech.ac.in"
      },
      {
        "id": "FAC_MAT_219",
        "name": "Dr. P. Chinnaraj",
        "department": "Mathematics",
        "designation": "Associate Professor",
        "specialization": "Algebra, Probability and Queueing Theory",
        "email": "chinnaraj@psgitech.ac.in"
      },
      {
        "id": "FAC_MAT_220",
        "name": "Dr. V. Chitra",
        "department": "Mathematics",
        "designation": "Associate Professor",
        "specialization": "Graph Theory - Graph Decompositions & Factorization",
        "email": "chitra@psgitech.ac.in"
      },
      {
        "id": "FAC_MAT_221",
        "name": "Mr. P. Gajendran",
        "department": "Mathematics",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Algebra Complex Analysis",
        "email": "gajendranp@psgitech.ac.in"
      },
      {
        "id": "FAC_MAT_222",
        "name": "Dr. S. Anitha",
        "department": "Mathematics",
        "designation": "Assistant Professor",
        "specialization": "Fluid Dynamics, Heat exchange",
        "email": "anitha@psgitech.ac.in"
      },
      {
        "id": "FAC_MAT_223",
        "name": "Dr. J. Grayna",
        "department": "Mathematics",
        "designation": "Assistant Professor",
        "specialization": "Differential Equations",
        "email": "grayna@psgitech.ac.in"
      },
      {
        "id": "FAC_MAT_224",
        "name": "Dr. E. Vignesh",
        "department": "Mathematics",
        "designation": "Assistant Professor",
        "specialization": "Computational fluid dynamics, Heat transfer",
        "email": "vignesh@psgitech.ac.in"
      },
      {
        "id": "FAC_MAT_225",
        "name": "Dr. J. Prabu",
        "department": "Mathematics",
        "designation": "Assistant Professor",
        "specialization": "Coding Theory",
        "email": "prabu@psgitech.ac.in"
      },
      {
        "id": "FAC_MAT_226",
        "name": "Dr. T. P. Sandhiya",
        "department": "Mathematics",
        "designation": "Assistant Professor",
        "specialization": "Graph Theory",
        "email": "sandhiya@psgitech.ac.in"
      },
      {
        "id": "FAC_MAT_227",
        "name": "Dr. M. S. Surendar",
        "department": "Mathematics",
        "designation": "Assistant Professor",
        "specialization": "Nonlinear Dynamics in Biology",
        "email": "surendar.sh@psgitech.ac.in"
      },
      {
        "id": "FAC_MAT_228",
        "name": "Dr. M. Kalaiselvi",
        "department": "Mathematics",
        "designation": "Assistant Professor",
        "specialization": "Epidemic Model, Complex Networks, Mathematical Biology",
        "email": "kalaiselvi.sh@psgitech.ac.in"
      },
      {
        "id": "FAC_MAT_229",
        "name": "Dr. D. Vignesh",
        "department": "Mathematics",
        "designation": "Assistant Professor",
        "specialization": "Wavelet Transform, Machine Learning",
        "email": "vignesh.sh@psgitech.ac.in"
      },
      {
        "id": "FAC_MAT_230",
        "name": "Dr. Y. Mary Christin Otto",
        "department": "Mathematics",
        "designation": "Assistant Professor",
        "specialization": "Functional Analysis",
        "email": "ymco.sh@psgitech.ac.in"
      },
      {
        "id": "FAC_MAT_231",
        "name": "Dr. S. Duraimurugan",
        "department": "Mathematics",
        "designation": "Assistant Professor",
        "specialization": "Graph theory",
        "email": "durai.sh@psgitech.ac.in"
      },
      {
        "id": "FAC_MAT_232",
        "name": "Dr. A. R. Gokul",
        "department": "Mathematics",
        "designation": "Assistant Professor",
        "specialization": "Response Surface Methodology, Probability and statistics",
        "email": "gokul.sh@psgitech.ac.in"
      }
    ],
    "Physics": [
      {
        "id": "FAC_PHY_233",
        "name": "Dr. S. Maruthamuthu",
        "department": "Physics",
        "designation": "Professor & HoD (i/c)",
        "specialization": "Dye sensitized solar cells, Energy storage devices, Thin films",
        "email": "maruthamuthu@psgitech.ac.in"
      },
      {
        "id": "FAC_PHY_234",
        "name": "Dr. D. Thangaraju",
        "department": "Physics",
        "designation": "Associate Professor",
        "specialization": "Nano Biotechnology and Bioimageing",
        "email": "thangaraju@psgitech.ac.in"
      },
      {
        "id": "FAC_PHY_235",
        "name": "Dr. T. K. Abilasha Ramadhas",
        "department": "Physics",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Materials Science, Non-Destructive Testing",
        "email": "abilasha@psgitech.ac.in"
      },
      {
        "id": "FAC_PHY_236",
        "name": "Dr. G. Bhavani",
        "department": "Physics",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Luminescence, Nanomaterials",
        "email": "bhavani@psgitech.ac.in"
      },
      {
        "id": "FAC_PHY_237",
        "name": "Dr. P. K. Kannan",
        "department": "Physics",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Inorganic thin film solar cell, Perovskite, High entropy oxides",
        "email": "kannan@psgitech.ac.in"
      },
      {
        "id": "FAC_PHY_238",
        "name": "Dr. Deepannita Chakraborty",
        "department": "Physics",
        "designation": "Assistant Professor",
        "specialization": "Dilute Magnetic oxide Thin films",
        "email": "deepannita@psgitech.ac.in"
      },
      {
        "id": "FAC_PHY_239",
        "name": "Dr. K. Mariselvam",
        "department": "Physics",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Spectroscopy, Radiation detection, Glasses, Perovskites",
        "email": "mariselvam@psgitech.ac.in"
      },
      {
        "id": "FAC_PHY_240",
        "name": "Dr. S. Gowrishankar",
        "department": "Physics",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Thin Films, Nanomaterials for Optoelectronic Applications",
        "email": "gowrishankar.sh@psgitech.ac.in"
      },
      {
        "id": "FAC_PHY_241",
        "name": "Dr. P. Mathan Kumar",
        "department": "Physics",
        "designation": "Assistant Professor",
        "specialization": "Thin films, Dye Sensitized Solar Cells, Electrochemical storage and conversion",
        "email": "mathankumar.sh@psgitech.ac.in"
      },
      {
        "id": "FAC_PHY_242",
        "name": "Dr. Riza Paul",
        "department": "Physics",
        "designation": "Assistant Professor",
        "specialization": "Photocatalysis, Nanomaterials, Photoelectrochemical studies",
        "email": "rizapaul.sh@psgitech.ac.in"
      },
      {
        "id": "FAC_PHY_243",
        "name": "Dr. T. Abhijith",
        "department": "Physics",
        "designation": "Assistant Professor",
        "specialization": "Nanoscience, Experimental Condensed Matter Physics",
        "email": ""
      },
      {
        "id": "FAC_PHY_244",
        "name": "Dr. M. Veena",
        "department": "Physics",
        "designation": "Assistant Professor",
        "specialization": "Material Science, Electrocatalysis, Nanosensor",
        "email": ""
      },
      {
        "id": "FAC_PHY_245",
        "name": "Dr. Sebin Devasia",
        "department": "Physics",
        "designation": "Assistant Professor",
        "specialization": "Computational Materials Science, Photovoltaics, Photodetectors",
        "email": ""
      },
      {
        "id": "FAC_PHY_246",
        "name": "Dr. P. Atheek",
        "department": "Physics",
        "designation": "Assistant Professor",
        "specialization": "Thin Film, Piezoelectric Materials",
        "email": ""
      },
      {
        "id": "FAC_PHY_247",
        "name": "Dr. S. Gunasekaran",
        "department": "Physics",
        "designation": "Post-Doctoral Fellow",
        "specialization": "Materials science, Energy storage",
        "email": "gunasekaran.sh@psgitech.ac.in"
      }
    ],
    "Chemistry": [
      {
        "id": "FAC_CHE_248",
        "name": "Dr. G. Latha",
        "department": "Chemistry",
        "designation": "Professor & HoD",
        "specialization": "Polymer Chemistry",
        "email": "latha@psgitech.ac.in"
      },
      {
        "id": "FAC_CHE_249",
        "name": "Dr. K. Balaji",
        "department": "Chemistry",
        "designation": "Professor",
        "specialization": "Polymer Chemistry",
        "email": "balaji@psgitech.ac.in"
      },
      {
        "id": "FAC_CHE_250",
        "name": "Dr. A. Kumaravel",
        "department": "Chemistry",
        "designation": "Associate Professor",
        "specialization": "Electro Chemistry",
        "email": "kumaravel@psgitech.ac.in"
      },
      {
        "id": "FAC_CHE_251",
        "name": "Dr. S. Devaraju",
        "department": "Chemistry",
        "designation": "Associate Professor",
        "specialization": "Polymer Nanocomposites and Hybrid Materials",
        "email": "devaraju@psgitech.ac.in"
      },
      {
        "id": "FAC_CHE_252",
        "name": "Dr. S. Chandirasekar",
        "department": "Chemistry",
        "designation": "Associate Professor",
        "specialization": "Nanoscience, Polymer Chemistry",
        "email": ""
      },
      {
        "id": "FAC_CHE_253",
        "name": "Dr. R. Sasikumar",
        "department": "Chemistry",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Polymer Science",
        "email": "sasikumar@psgitech.ac.in"
      },
      {
        "id": "FAC_CHE_254",
        "name": "Dr. G. Sathiyan",
        "department": "Chemistry",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Organic Chemistry, Organic/Perovskite Solar Cells, Chemosensor Polymers",
        "email": ""
      },
      {
        "id": "FAC_CHE_255",
        "name": "Dr. P. Pradeepkumar",
        "department": "Chemistry",
        "designation": "Assistant Professor (Research)",
        "specialization": "Polymer Chemistry",
        "email": "pradeepkumar.sh@psgitech.ac.in"
      },
      {
        "id": "FAC_CHE_256",
        "name": "Dr. M. Mayakkannan",
        "department": "Chemistry",
        "designation": "Assistant Professor (Research)",
        "specialization": "Nanomaterials for Energy Storage Applications",
        "email": "maya.sh@psgitech.ac.in"
      },
      {
        "id": "FAC_CHE_257",
        "name": "Dr. G. Alagarsamy",
        "department": "Chemistry",
        "designation": "Assistant Professor (Research)",
        "specialization": "Critical Metal Recovery, Wastewater Treatment",
        "email": "asg.sh@psgitech.ac.in"
      },
      {
        "id": "FAC_CHE_258",
        "name": "Dr. S. Manigandan",
        "department": "Chemistry",
        "designation": "Assistant Professor (Research)",
        "specialization": "Polymer Chemistry",
        "email": "manigandan.sh@psgitech.ac.in"
      },
      {
        "id": "FAC_CHE_259",
        "name": "Dr. V. Naveensubramaniam",
        "department": "Chemistry",
        "designation": "Assistant Professor",
        "specialization": "Materials Chemistry",
        "email": "naveenv.sh@psgitech.ac.in"
      },
      {
        "id": "FAC_CHE_260",
        "name": "Dr. S. Prabhu",
        "department": "Chemistry",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Photo/Electrocatalysis for Energy Applications",
        "email": "prabhu@psgitech.ac.in"
      },
      {
        "id": "FAC_CHE_261",
        "name": "Dr. K Arunkumar",
        "department": "Chemistry",
        "designation": "Assistant Professor",
        "specialization": "Fuel Cell, Polymer Chemistry",
        "email": "arunkumar@psgitech.ac.in"
      },
      {
        "id": "FAC_CHE_262",
        "name": "Dr. A. V. Rajalakshmi",
        "department": "Chemistry",
        "designation": "Assistant Professor",
        "specialization": "Fluorescent Sensors, Organic Chemistry",
        "email": "rajalakshmi@psgitech.ac.in"
      }
    ],
    "English": [
      {
        "id": "FAC_ENG_263",
        "name": "Dr. K. Pramila",
        "department": "English",
        "designation": "Professor & HOD",
        "specialization": "English Literature, English Language Teaching and Softskills",
        "email": "pramila@psgitech.ac.in"
      },
      {
        "id": "FAC_ENG_264",
        "name": "Dr. S. Gandhimathi",
        "department": "English",
        "designation": "Associate Professor",
        "specialization": "English Language Teaching, English Literature and Educational Psychology",
        "email": "gandhimathi@psgitech.ac.in"
      },
      {
        "id": "FAC_ENG_265",
        "name": "Dr. R. Ravindran",
        "department": "English",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Comparative Literature",
        "email": "ravindran@psgitech.ac.in"
      },
      {
        "id": "FAC_ENG_266",
        "name": "Dr. A. Muthukannan",
        "department": "English",
        "designation": "Assistant Professor",
        "specialization": "American Literature",
        "email": "muthukannan@psgitech.ac.in"
      },
      {
        "id": "FAC_ENG_267",
        "name": "Dr. V. Sutharshan",
        "department": "English",
        "designation": "Assistant Professor",
        "specialization": "ELT and Fiction",
        "email": "sutharshan@psgitech.ac.in"
      },
      {
        "id": "FAC_ENG_268",
        "name": "Dr. K. Satheesh Kumar",
        "department": "English",
        "designation": "Assistant Professor",
        "specialization": "English Language Teaching, Comparative Literature, & Public Speaking",
        "email": "sk.sh@psgitech.ac.in"
      },
      {
        "id": "FAC_ENG_269",
        "name": "Dr. C. Ganesh",
        "department": "English",
        "designation": "Assistant Professor",
        "specialization": "Indian Writing in English, Comparative Literature",
        "email": "ganesh.sh@psgitech.ac.in"
      }
    ],
    "Humanities": [
      {
        "id": "FAC_HUM_270",
        "name": "Dr. R. Ravikumar",
        "department": "Humanities",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Agribusiness Management",
        "email": "ravikumar@psgitech.ac.in"
      },
      {
        "id": "FAC_HUM_271",
        "name": "Dr. R. Uma",
        "department": "Humanities",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Human Resource Management",
        "email": "uma@psgitech.ac.in"
      },
      {
        "id": "FAC_HUM_272",
        "name": "Dr. K. Selvamohana",
        "department": "Humanities",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Management (Marketing & Finance)",
        "email": "selvamohana@psgitech.ac.in"
      }
    ],
    "Tamil": [
      {
        "id": "FAC_TAM_273",
        "name": "Mr. T. Prakash",
        "department": "Tamil",
        "designation": "Assistant Professor - Tamil",
        "specialization": "Sangam Literature",
        "email": "prakash@psgitech.ac.in"
      },
      {
        "id": "FAC_TAM_274",
        "name": "Ms. S. Lubuna Leilani",
        "department": "Tamil",
        "designation": "Assistant Professor - Tamil",
        "specialization": "Tamil Literature",
        "email": "lls.sh@psgitech.ac.in"
      }
    ],
    "Mechanical": [
      {
        "id": "FAC_MEC_275",
        "name": "Dr. P. Manoj Kumar",
        "department": "Mechanical",
        "designation": "Professor & HOD",
        "specialization": "Heat Transfer Energy",
        "email": "manoj@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_276",
        "name": "Dr. P. V. Mohanram",
        "department": "Mechanical",
        "designation": "Professor",
        "specialization": "Mechanical Engineering",
        "email": "secretary@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_277",
        "name": "Dr. G. Chandramohan",
        "department": "Mechanical",
        "designation": "Professor",
        "specialization": "Mechanical Engineering",
        "email": "gcm@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_278",
        "name": "Dr. N. Saravanakumar",
        "department": "Mechanical",
        "designation": "Professor",
        "specialization": "Engineering Design",
        "email": "principal@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_279",
        "name": "Dr. R. Ramesh",
        "department": "Mechanical",
        "designation": "Professor",
        "specialization": "Engineering Design",
        "email": "ramesh@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_280",
        "name": "Dr. G. Rajeshkumar",
        "department": "Mechanical",
        "designation": "Professor",
        "specialization": "Engineering Design",
        "email": "rajesh@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_281",
        "name": "Dr. S. Thirumalai Kumaran",
        "department": "Mechanical",
        "designation": "Professor",
        "specialization": "Manufacturing Engineering",
        "email": "thirumalaikumaran@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_282",
        "name": "Dr. V Rajkumar",
        "department": "Mechanical",
        "designation": "Associate Professor",
        "specialization": "Manufacturing Engineering",
        "email": "rajkumarv@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_283",
        "name": "Dr. K. Senthil Kumar",
        "department": "Mechanical",
        "designation": "Associate Professor",
        "specialization": "Composite Materials",
        "email": "kmsenthilkumar@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_284",
        "name": "Dr. X. Ajay Vasanth",
        "department": "Mechanical",
        "designation": "Associate Professor",
        "specialization": "Vibration, Smart Materials, IIOT",
        "email": "ajayvasanth@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_285",
        "name": "Dr. S. Nanthakumar",
        "department": "Mechanical",
        "designation": "Associate Professor",
        "specialization": "Lean Manufacturing",
        "email": "snkmech@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_286",
        "name": "Dr. J. Nagarjun",
        "department": "Mechanical",
        "designation": "Associate Professor",
        "specialization": "Engineering Design",
        "email": "nagarjun@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_287",
        "name": "Dr. T. Prem kumar",
        "department": "Mechanical",
        "designation": "Associate Professor",
        "specialization": "Solar energy and Thermal energy",
        "email": "premkumar@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_288",
        "name": "Dr. G. Swaminathan",
        "department": "Mechanical",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Smart Materials, Materials Characterization",
        "email": "swaminathan@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_289",
        "name": "Dr. G. Girish",
        "department": "Mechanical",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Material Science, Manufacturing and Industrial Engg.",
        "email": "girish@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_290",
        "name": "Dr. R. Avinash Kumar",
        "department": "Mechanical",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Thermal & Fluids",
        "email": "avinash@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_291",
        "name": "Dr. S. Jayachandran",
        "department": "Mechanical",
        "designation": "Assistant Professor (Selection Grade)",
        "specialization": "Surface Coating, Material Characterization",
        "email": "jayachandran.me@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_292",
        "name": "Dr. B. Jagadeesh",
        "department": "Mechanical",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Advanced Manufacturing",
        "email": "jagadeesh@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_293",
        "name": "Dr. V. G. Shanmuga Priyan",
        "department": "Mechanical",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Metal Matrix Composites, Non-conventional Machines, Micro-Machines",
        "email": "shanmugapriyan.me@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_294",
        "name": "Dr. Yogesh Prabhu",
        "department": "Mechanical",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Material science",
        "email": "yogeshprabhu.me@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_295",
        "name": "Dr. N. Bhuvanesh",
        "department": "Mechanical",
        "designation": "Assistant Professor (Senior Grade)",
        "specialization": "Thermal Engineering",
        "email": "bhuvanesh.me@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_296",
        "name": "Mr. V. Vijai Kaarthi",
        "department": "Mechanical",
        "designation": "Assistant Professor",
        "specialization": "Energy Engineering",
        "email": "vvk.mech@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_297",
        "name": "Dr. P. Abhilash",
        "department": "Mechanical",
        "designation": "Assistant Professor (Research)",
        "specialization": "Materials Joining, Additive manufacturing",
        "email": "abhilash.me@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_298",
        "name": "Dr. M. Dinesh Kumar",
        "department": "Mechanical",
        "designation": "Assistant Professor (Research)",
        "specialization": "Fuel Cells",
        "email": "mdk.me@psgitech.ac.in"
      },
      {
        "id": "FAC_MEC_299",
        "name": "Dr. G. Sathyamoorthy",
        "department": "Mechanical",
        "designation": "Assistant Professor (Research)",
        "specialization": "Brake Friction Materials, Polymer Composites",
        "email": "sathyamoorthy.me@psgitech.ac.in"
      }
    ]
  },
  "list": [
    {
      "id": "FAC_VLSI_1",
      "name": "Dr. P. Vijayakumar",
      "department": "VLSI",
      "designation": "Professor & HoD",
      "specialization": "VLSI (Low Power), Automation",
      "email": "pvk@psgitech.ac.in"
    },
    {
      "id": "FAC_VLSI_2",
      "name": "Dr. M. Jayasanthi",
      "department": "VLSI",
      "designation": "Professor",
      "specialization": "ASIC Design & Signal Processing",
      "email": "jayasanthiranjith@psgitech.ac.in"
    },
    {
      "id": "FAC_VLSI_3",
      "name": "Dr. S. Sridevi Sathya Priya",
      "department": "VLSI",
      "designation": "Associate Professor",
      "specialization": "VLSI, FPGA Hardware Security",
      "email": "sridevi.ec@psgitech.ac.in"
    },
    {
      "id": "FAC_VLSI_4",
      "name": "Dr. S. Padmapriya",
      "department": "VLSI",
      "designation": "Assistant Professor (Sl.G)",
      "specialization": "Low Power VLSI, Reconfigurable Architectures",
      "email": "padmapriya@psgitech.ac.in"
    },
    {
      "id": "FAC_VLSI_5",
      "name": "Dr. M. Deepa",
      "department": "VLSI",
      "designation": "Assistant Professor (Sl.G)",
      "specialization": "Digital Design and VLSI Design",
      "email": "deepa@psgitech.ac.in"
    },
    {
      "id": "FAC_VLSI_6",
      "name": "Dr. K. Paldurai",
      "department": "VLSI",
      "designation": "Assistant Professor (Sl.G)",
      "specialization": "Digital Arithmetic Circuit Design, Mixed Signal IC",
      "email": "paldurai.k@psgitech.ac.in"
    },
    {
      "id": "FAC_VLSI_7",
      "name": "Dr. J. R. Dinesh Kumar",
      "department": "VLSI",
      "designation": "Assistant Professor (Sl.G)",
      "specialization": "VLSI, Low Power Architectures",
      "email": "dineshkumar.ec@psgitech.ac.in"
    },
    {
      "id": "FAC_VLSI_8",
      "name": "Dr. M. Priyadharshini",
      "department": "VLSI",
      "designation": "Assistant Professor",
      "specialization": "Hardware Security, VLSI Design, AI",
      "email": "priyadharshini.ec@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_101",
      "name": "Dr. P. Vijayakumar",
      "department": "ECE",
      "designation": "Professor & HoD",
      "specialization": "VLSI (Low Power), Automation",
      "email": "pvk@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_102",
      "name": "Dr. M. Jayasanthi",
      "department": "ECE",
      "designation": "Professor",
      "specialization": "ASIC Design and Signal processing",
      "email": "jayasanthiranjith@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_103",
      "name": "Dr. C. Arvind",
      "department": "ECE",
      "designation": "Professor",
      "specialization": "Signal Processing & Communication Systems",
      "email": "arvind@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_104",
      "name": "Dr. G. Santhanamari",
      "department": "ECE",
      "designation": "Associate Professor",
      "specialization": "Image Processing, Embedded systems",
      "email": "gsm@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_105",
      "name": "Dr. D. Selvakumar",
      "department": "ECE",
      "designation": "Associate Professor",
      "specialization": "Nanoelectronics, Embedded systems",
      "email": "selvakumar@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_106",
      "name": "Dr. B. A. Sapna",
      "department": "ECE",
      "designation": "Associate Professor",
      "specialization": "Communication Systems",
      "email": "sapna.ec@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_107",
      "name": "Dr. S. Sridevi Sathya Priya",
      "department": "ECE",
      "designation": "Associate Professor",
      "specialization": "VLSI, FPGA based Hardware Security, Cryptographic Hardware Architecture , PUF based Security Systems",
      "email": "sridevi.ec@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_108",
      "name": "Dr. S. Padmapriya",
      "department": "ECE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Low Power VLSI, Reconfigurable Architectures, Signal Processing and Computer Vision",
      "email": "padmapriya@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_109",
      "name": "Dr. M. Jothibasu",
      "department": "ECE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Digital Signal Processing, Image processing",
      "email": "jothibasu@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_110",
      "name": "Dr. M. Deepa",
      "department": "ECE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Digital Design and VLSI Design",
      "email": "deepa@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_111",
      "name": "Dr. K. Paldurai",
      "department": "ECE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Digital Arithmetic Circuit Design, Mixed Signal IC Design",
      "email": "paldurai.k@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_112",
      "name": "Dr. T. Pravinraj",
      "department": "ECE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "MEMS, VLSI Process Technology, Solver Development",
      "email": "pravinraj@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_113",
      "name": "Dr. P. Sridhar",
      "department": "ECE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Signal Processing, Image Processing, Computer Vision",
      "email": "sridhar.p@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_114",
      "name": "Dr. S. P. Cowsigan",
      "department": "ECE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "RF, Microwave and Antenna Design",
      "email": "cowsigan@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_115",
      "name": "Dr. J. S. Sujin",
      "department": "ECE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Image Processing, Signal Processing, Robotics",
      "email": "sujin@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_116",
      "name": "Dr. P. Sakthivel",
      "department": "ECE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Wireless Technologies",
      "email": "drspvel.ec@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_117",
      "name": "Dr. J. R. Dinesh Kumar",
      "department": "ECE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "VLSI, Low Power Architectures, Biomedical Signal Processing and Machine Learning",
      "email": "dineshkumar.ec@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_118",
      "name": "Dr. B. Tharini",
      "department": "ECE",
      "designation": "Assistant Professor",
      "specialization": "MIMO Antennas, Wireless Communication",
      "email": "tharini@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_119",
      "name": "Dr. M. Priyadharshini",
      "department": "ECE",
      "designation": "Assistant Professor",
      "specialization": "Hardware Security, VLSI Design, AI",
      "email": "priyadharshini.ec@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_120",
      "name": "Dr. S. Jayanthi Sree",
      "department": "ECE",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Biomedical Image Processing, VLSI Design, ML",
      "email": "jayanthisree@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_121",
      "name": "Mr. R. RajaRaja",
      "department": "ECE",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "VLSI Design",
      "email": "rajaraja@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_122",
      "name": "Ms. N. Susithra",
      "department": "ECE",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "VLSI Design, VLSI Signal Processing",
      "email": "susithra@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_123",
      "name": "Dr. M. Sowmiya",
      "department": "ECE",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Communication Systems, Biomedical Signal Processing, Machine Learning",
      "email": "sowmiya@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_124",
      "name": "Ms. D.Archana",
      "department": "ECE",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Applied Electronics",
      "email": "archana@psgitech.ac.in"
    },
    {
      "id": "FAC_ECE_125",
      "name": "Dr. N. Iswarya",
      "department": "ECE",
      "designation": "Assistant Professor",
      "specialization": "Communication Systems",
      "email": "iswarya@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_126",
      "name": "Dr. B. Gomathy",
      "department": "CSE",
      "designation": "Professor & HOD (i/c)",
      "specialization": "Data Analytics",
      "email": "drgomathy@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_127",
      "name": "Dr. R. Manimegalai",
      "department": "CSE",
      "designation": "Professor",
      "specialization": "Distributed Computing VLSI Algorithms, IoT and Security",
      "email": "drrm@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_128",
      "name": "Dr. S. Kalarani",
      "department": "CSE",
      "designation": "HoD (i/c)",
      "specialization": "Cloud Computing, Deep Learning",
      "email": "kalarani@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_129",
      "name": "Dr. R. Manjula Devi",
      "department": "CSE",
      "designation": "Professor",
      "specialization": "Machine Learning, Image Processing, Soft Computing, AI",
      "email": "manjuladevi.cs@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_130",
      "name": "Mr. V. Harikrishnan",
      "department": "CSE",
      "designation": "Professor of Practice",
      "specialization": "Project Management, ERP",
      "email": "harikrishnan.cs@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_131",
      "name": "Dr. I. Kala",
      "department": "CSE",
      "designation": "Associate Professor",
      "specialization": "Mobile AdHoc Network and Database Management System",
      "email": "kala@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_132",
      "name": "Dr. K. Malarvizhi",
      "department": "CSE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Machine Learning, Deep Learning",
      "email": "malarvizhi@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_133",
      "name": "Dr. T. Kalai Selvi",
      "department": "CSE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Internet of Things (IoT), Data Management",
      "email": "tks.cs@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_134",
      "name": "Dr. M. N. Kavitha",
      "department": "CSE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Machine Learning, Deep Learning & Operating System",
      "email": "kavitha@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_135",
      "name": "Dr. A. Sunitha Nandhini",
      "department": "CSE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Artifical Intelligence, Internet of Things",
      "email": "asn@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_136",
      "name": "Ms. M. Kirubadevi",
      "department": "CSE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Software Engineering",
      "email": "kirubadevi@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_137",
      "name": "Dr. M. Sangeetha",
      "department": "CSE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Deep Learning, Graph Neural Networks",
      "email": "sangeetha.cs@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_138",
      "name": "Dr. M. Karthigha",
      "department": "CSE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Network Security, Augmented Reality & Virtual Reality",
      "email": "karthigha@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_139",
      "name": "Ms. P. Jeevitha",
      "department": "CSE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Machine Learning",
      "email": "jeevithap@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_140",
      "name": "Dr. S. S. Saranya",
      "department": "CSE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Security, Blockchain",
      "email": "saranya@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_141",
      "name": "Dr. Sathya Balaji",
      "department": "CSE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Machine Learning, Artificial Intelligence",
      "email": "sathyabalaji@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_142",
      "name": "Ms. P. Shanmugapriya",
      "department": "CSE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "DBMS, Machine Learning , Deep Learning",
      "email": "shanmugapriya@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_143",
      "name": "Lt. V. Vilasini",
      "department": "CSE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Data Science and Data Analytics",
      "email": "vilasini@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_144",
      "name": "Dr. S. Vaishnavi",
      "department": "CSE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Data Science, Machine Learning",
      "email": "vaishnavis@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_145",
      "name": "Dr. V. C. Maha Vishnu",
      "department": "CSE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Video Data Mining and Image Analytics",
      "email": "mvvc@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_146",
      "name": "Ms. P. Gouthami",
      "department": "CSE",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Machine Learning, Deep Learning",
      "email": "gouthami.cs@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_147",
      "name": "Ms. S. Leela",
      "department": "CSE",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Deep Learning",
      "email": "leela.cs@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_148",
      "name": "Mr. B. Ajith Jerom",
      "department": "CSE",
      "designation": "Assistant Professor",
      "specialization": "Data Science and Data Analytics",
      "email": "ajith@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_149",
      "name": "Ms. C. Divya Gowri",
      "department": "CSE",
      "designation": "Assistant Professor",
      "specialization": "Data Mining, Database Management System",
      "email": "divya.cs@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_150",
      "name": "Mr. S. Joemathew",
      "department": "CSE",
      "designation": "Assistant Professor",
      "specialization": "Software Testing, AI Testing",
      "email": "joemathews.cs@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_151",
      "name": "Ms. S. V. Sowthika",
      "department": "CSE",
      "designation": "Assistant Professor",
      "specialization": "Machine Learning, DBMS",
      "email": "sowthika.cs@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_152",
      "name": "Ms. R. Hemapriya",
      "department": "CSE",
      "designation": "Assistant Professor",
      "specialization": "DBMS, Machine Learning",
      "email": "hemapriya.cs@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_153",
      "name": "Dr. B. Gomathi",
      "department": "CSE",
      "designation": "Associate Professor",
      "specialization": "Cloud Computing, Machine Learning, Optimization Techniques",
      "email": "gomathi@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_154",
      "name": "Dr. P. Anantha Prabha",
      "department": "CSE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Deep Learning, Cloud Computing",
      "email": "ap@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_155",
      "name": "Mr. K. S. Giriprasath",
      "department": "CSE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Cyber security, Network Security",
      "email": "giriprasath@psgitech.ac.in"
    },
    {
      "id": "FAC_CSE_156",
      "name": "Dr. G. Sudha Sadasivam",
      "department": "CSE",
      "designation": "Visiting Professor",
      "specialization": "Big Data Analytics, Privacy Preservation",
      "email": ""
    },
    {
      "id": "FAC_AI _157",
      "name": "Dr. S. Kalarani",
      "department": "AI & DS",
      "designation": "HoD (i/c)",
      "specialization": "Cloud Computing, Deep Learning",
      "email": "kalarani@psgitech.ac.in"
    },
    {
      "id": "FAC_AI _158",
      "name": "Dr. S. Lokesh",
      "department": "AI & DS",
      "designation": "Professor",
      "specialization": "AI, Human-Computer Interaction, Data Science",
      "email": "lokesh@psgitech.ac.in"
    },
    {
      "id": "FAC_AI _159",
      "name": "Dr. R. Priya Vaijayanthi",
      "department": "AI & DS",
      "designation": "Associate Professor",
      "specialization": "Machine Learning, Deep Learning, Generative AI",
      "email": "rpv.ai@psgitech.ac.in"
    },
    {
      "id": "FAC_AI _160",
      "name": "Dr. S. Sangeetha",
      "department": "AI & DS",
      "designation": "Associate Professor",
      "specialization": "Responsible AI, Deep Learning, Generative AI",
      "email": "sangeetha@psgitech.ac.in"
    },
    {
      "id": "FAC_AI _161",
      "name": "Mr. R. Muthu Kumar",
      "department": "AI & DS",
      "designation": "Associate Professor of Practice",
      "specialization": "DevOps, Technology Modernization",
      "email": "muthukumar.ai@psgitech.ac.in"
    },
    {
      "id": "FAC_AI _162",
      "name": "Mr. C. Santhosh",
      "department": "AI & DS",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Data Science, Big Data Analysis",
      "email": "santhosh@psgitech.ac.in"
    },
    {
      "id": "FAC_AI _163",
      "name": "Ms. S. Dhivya",
      "department": "AI & DS",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Database management systems, Fullstack development, Machine Learning",
      "email": "dhivya.ai@psgitech.ac.in"
    },
    {
      "id": "FAC_AI _164",
      "name": "Ms. G. Suganya",
      "department": "AI & DS",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "DevOps, Soft Computing",
      "email": "suganya@psgitech.ac.in"
    },
    {
      "id": "FAC_AI _165",
      "name": "Ms. P. Gomathi",
      "department": "AI & DS",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Deep Learning, Computer Networks, Data Science",
      "email": "gomathi.ai@psgitech.ac.in"
    },
    {
      "id": "FAC_AI _166",
      "name": "Ms. P. Nirmala Priyadharshini",
      "department": "AI & DS",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Cloud Computing, Object Oriented Programming",
      "email": "nirmala.ai@psgitech.ac.in"
    },
    {
      "id": "FAC_AI _167",
      "name": "Ms. E. Kalaivani",
      "department": "AI & DS",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Machine Learning",
      "email": "kalaivani.ai@psgitech.ac.in"
    },
    {
      "id": "FAC_AI _168",
      "name": "Ms. K. Sathya",
      "department": "AI & DS",
      "designation": "Assistant Professor",
      "specialization": "Machine Learning, Deep Learning",
      "email": "sathya@psgitech.ac.in"
    },
    {
      "id": "FAC_AI _169",
      "name": "Ms. K. Santhiya",
      "department": "AI & DS",
      "designation": "Assistant Professor",
      "specialization": "Data Structures, Machine Learning, Deep Learning",
      "email": "santhiya@psgitech.ac.in"
    },
    {
      "id": "FAC_AI _170",
      "name": "Ms. R. S. Niranjana",
      "department": "AI & DS",
      "designation": "Assistant Professor",
      "specialization": "Deep Learning, Cybersecurity, Data Structures",
      "email": "niranjana@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_171",
      "name": "Dr. C. S. Subash Kumar",
      "department": "EEE",
      "designation": "Associate Professor & HOD (i/c)",
      "specialization": "Electrical Machines",
      "email": "css@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_172",
      "name": "Dr. C. L. Vasu",
      "department": "EEE",
      "designation": "Professor",
      "specialization": "Embedded Systems",
      "email": "clv@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_173",
      "name": "Dr. E. Malar",
      "department": "EEE",
      "designation": "Professor",
      "specialization": "Biomedical Instrumentation and MI Processing",
      "email": "emr@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_174",
      "name": "Dr. M. Mohamed Iqbal",
      "department": "EEE",
      "designation": "Professor",
      "specialization": "Power System and Renewable Energy",
      "email": "iqbal@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_175",
      "name": "Dr. J. Baskaran",
      "department": "EEE",
      "designation": "Professor",
      "specialization": "Power System Engineering, Distributed Generation, Renewable Energy",
      "email": "baskaran@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_176",
      "name": "Dr. D. Sivakumar",
      "department": "EEE",
      "designation": "Visiting Professor",
      "specialization": "Instrumentation & Process Control",
      "email": "sivakumar@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_177",
      "name": "Dr. N. Bharathi",
      "department": "EEE",
      "designation": "Professor",
      "specialization": "Process Control, Intelligent Controllers",
      "email": "bharathi.ee@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_178",
      "name": "Mr. V. Sivaganesh",
      "department": "EEE",
      "designation": "Professor of Practice",
      "specialization": "Applied Electronics",
      "email": "sivaganesh.v@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_179",
      "name": "Dr. B. Adhavan",
      "department": "EEE",
      "designation": "Associate Professor",
      "specialization": "Power Electronics and Drives",
      "email": "adhavan@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_180",
      "name": "Dr. M. Sathiyanathan",
      "department": "EEE",
      "designation": "Associate Professor",
      "specialization": "Power Electronics.Drives",
      "email": "sathiyangm@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_181",
      "name": "Dr. E. Govinda Kumar",
      "department": "EEE",
      "designation": "Associate Professor",
      "specialization": "Control Systems, Sliding mode control, Controller optimization",
      "email": "govindakumar@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_182",
      "name": "Dr. M. Elenchezhiyan",
      "department": "EEE",
      "designation": "Associate Professor",
      "specialization": "Control & Instrumentation",
      "email": "elen.ee@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_183",
      "name": "Dr. S. Julius Fusic",
      "department": "EEE",
      "designation": "Associate Professor",
      "specialization": "Localization and Navigation of Autonomous Systems",
      "email": "sjf.ee@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_184",
      "name": "Dr. R. Vijay",
      "department": "EEE",
      "designation": "Associate Professor",
      "specialization": "Power Systems Engineering, Applications of AI & ML in EEE, Green Hydrogen, Electric Vehicle Routing",
      "email": "vijay.ee@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_185",
      "name": "Dr. M. Senthilkumar",
      "department": "EEE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Embedded System",
      "email": "senthilkumar@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_186",
      "name": "Mr. S. Ravikrishna",
      "department": "EEE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Electrical Machines",
      "email": "ravikrishna@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_187",
      "name": "Dr. C. V. Pavithra",
      "department": "EEE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Electrical Machines",
      "email": "pavithra@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_188",
      "name": "Dr. B. Suresh",
      "department": "EEE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Power Electronics and Drives",
      "email": "suresh@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_189",
      "name": "Dr. S. Arivoli",
      "department": "EEE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Control Systems and Instrumentation",
      "email": "arivoli@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_190",
      "name": "Dr. A. P. Roger Rozario",
      "department": "EEE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Internet of Things, AI & ML",
      "email": "rogerrozario@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_191",
      "name": "Dr. H. Ramesh",
      "department": "EEE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Electrical Drives and Control, Motion Control Applications, Industry 4.0, Robotics",
      "email": "ramesh.ee@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_192",
      "name": "Dr. K. Bavithra",
      "department": "EEE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Power systems engineering (Restructuring)",
      "email": "bavithra@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_193",
      "name": "Ms. R. Divya",
      "department": "EEE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Power Systems",
      "email": "divya@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_194",
      "name": "Dr. G. Sophia Jasmine",
      "department": "EEE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Power Systems Engineering",
      "email": "sophia.ee@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_195",
      "name": "Dr. S. Karthikeyan",
      "department": "EEE",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Power Electronics and Drives",
      "email": "karthikeyans.ee@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_196",
      "name": "Dr. A. Jeyashree",
      "department": "EEE",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Power Electronics & Drives.Solar Energy",
      "email": "jeyashreea@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_197",
      "name": "Dr. V. R. Kavya",
      "department": "EEE",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Process Control",
      "email": "kavya.ee@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_198",
      "name": "Dr. P. R. Jain Vinith",
      "department": "EEE",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Power System Planning and Operation, Energy Management",
      "email": "jainvinith.ee@psgitech.ac.in"
    },
    {
      "id": "FAC_EEE_199",
      "name": "Mr. V. Srimaheswaran",
      "department": "EEE",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Power Electronics & Drives",
      "email": "srimaheswaran.ee@psgitech.ac.in"
    },
    {
      "id": "FAC_CIV_200",
      "name": "Dr. P. Muthupriya",
      "department": "Civil",
      "designation": "Professor & HoD",
      "specialization": "Structural Engineering",
      "email": "muthupriya@psgitech.ac.in"
    },
    {
      "id": "FAC_CIV_201",
      "name": "Dr. M. I. Abdul Aleem",
      "department": "Civil",
      "designation": "Professor",
      "specialization": "Structural Engineering",
      "email": "aleem@psgitech.ac.in"
    },
    {
      "id": "FAC_CIV_202",
      "name": "Dr. M. Arun",
      "department": "Civil",
      "designation": "Professor",
      "specialization": "Structural Engineering",
      "email": "arun@psgitech.ac.in"
    },
    {
      "id": "FAC_CIV_203",
      "name": "Dr. R. Rajkumar",
      "department": "Civil",
      "designation": "Associate Professor",
      "specialization": "Infrastructure Engineering",
      "email": "rajkumar@psgitech.ac.in"
    },
    {
      "id": "FAC_CIV_204",
      "name": "Dr. V. Navin Ganesh",
      "department": "Civil",
      "designation": "Associate Professor",
      "specialization": "Transportation Engineering and Management",
      "email": "navinganesh@psgitech.ac.in"
    },
    {
      "id": "FAC_CIV_205",
      "name": "Mr. S. Elayaraja",
      "department": "Civil",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Geotechnical Engineering",
      "email": "elayaraja@psgitech.ac.in"
    },
    {
      "id": "FAC_CIV_206",
      "name": "Dr. M. R. Ezhil Kumar",
      "department": "Civil",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Environmental Management",
      "email": "ezhilkumar@psgitech.ac.in"
    },
    {
      "id": "FAC_CIV_207",
      "name": "Mr. P. Balakumar",
      "department": "Civil",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Infrastructure Engineering",
      "email": "pbkciv@psgitech.ac.in"
    },
    {
      "id": "FAC_CIV_208",
      "name": "Dr. J. Karthick",
      "department": "Civil",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Structural Engineering",
      "email": "karthick@psgitech.ac.in"
    },
    {
      "id": "FAC_CIV_209",
      "name": "Dr. K. Govarthanambikai",
      "department": "Civil",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Infrastructure Engineering",
      "email": "kgk@psgitech.ac.in"
    },
    {
      "id": "FAC_CIV_210",
      "name": "Ms. V. Selvapriya",
      "department": "Civil",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Structural Engineering",
      "email": "vsp@psgitech.ac.in"
    },
    {
      "id": "FAC_CIV_211",
      "name": "Mr. K. Sakthi Prasanth",
      "department": "Civil",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Structural Engineering",
      "email": "ksp@psgitech.ac.in"
    },
    {
      "id": "FAC_CIV_212",
      "name": "Ms. R. Nidhya",
      "department": "Civil",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Structural Engineering",
      "email": "nidhya@psgitech.ac.in"
    },
    {
      "id": "FAC_CIV_213",
      "name": "Dr. P. A. Sivasubramani",
      "department": "Civil",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Infrastructure Engineer",
      "email": "sivasubramani@psgitech.ac.in"
    },
    {
      "id": "FAC_CIV_214",
      "name": "Dr. R. Balaji",
      "department": "Civil",
      "designation": "Assistant Professor",
      "specialization": "Environmental Engineering",
      "email": "balaji.civil@psgitech.ac.in"
    },
    {
      "id": "FAC_CIV_215",
      "name": "Dr. N. Divyah",
      "department": "Civil",
      "designation": "Assistant Professor",
      "specialization": "Structural Engineering",
      "email": "divyah@psgitech.ac.in"
    },
    {
      "id": "FAC_MAT_216",
      "name": "Dr. S. Aramuthakannan",
      "department": "Mathematics",
      "designation": "Professor & HoD (i/c)",
      "specialization": "Optimization Techniques",
      "email": "sakannan@psgitech.ac.in"
    },
    {
      "id": "FAC_MAT_217",
      "name": "Dr. M. Venkatesan",
      "department": "Mathematics",
      "designation": "Professor",
      "specialization": "Solid Mechanics",
      "email": "coe@psgitech.ac.in"
    },
    {
      "id": "FAC_MAT_218",
      "name": "Dr. R. S. Sankara Subramanian",
      "department": "Mathematics",
      "designation": "Professor",
      "specialization": "Cryptography",
      "email": "rss@psgitech.ac.in"
    },
    {
      "id": "FAC_MAT_219",
      "name": "Dr. P. Chinnaraj",
      "department": "Mathematics",
      "designation": "Associate Professor",
      "specialization": "Algebra, Probability and Queueing Theory",
      "email": "chinnaraj@psgitech.ac.in"
    },
    {
      "id": "FAC_MAT_220",
      "name": "Dr. V. Chitra",
      "department": "Mathematics",
      "designation": "Associate Professor",
      "specialization": "Graph Theory - Graph Decompositions & Factorization",
      "email": "chitra@psgitech.ac.in"
    },
    {
      "id": "FAC_MAT_221",
      "name": "Mr. P. Gajendran",
      "department": "Mathematics",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Algebra Complex Analysis",
      "email": "gajendranp@psgitech.ac.in"
    },
    {
      "id": "FAC_MAT_222",
      "name": "Dr. S. Anitha",
      "department": "Mathematics",
      "designation": "Assistant Professor",
      "specialization": "Fluid Dynamics, Heat exchange",
      "email": "anitha@psgitech.ac.in"
    },
    {
      "id": "FAC_MAT_223",
      "name": "Dr. J. Grayna",
      "department": "Mathematics",
      "designation": "Assistant Professor",
      "specialization": "Differential Equations",
      "email": "grayna@psgitech.ac.in"
    },
    {
      "id": "FAC_MAT_224",
      "name": "Dr. E. Vignesh",
      "department": "Mathematics",
      "designation": "Assistant Professor",
      "specialization": "Computational fluid dynamics, Heat transfer",
      "email": "vignesh@psgitech.ac.in"
    },
    {
      "id": "FAC_MAT_225",
      "name": "Dr. J. Prabu",
      "department": "Mathematics",
      "designation": "Assistant Professor",
      "specialization": "Coding Theory",
      "email": "prabu@psgitech.ac.in"
    },
    {
      "id": "FAC_MAT_226",
      "name": "Dr. T. P. Sandhiya",
      "department": "Mathematics",
      "designation": "Assistant Professor",
      "specialization": "Graph Theory",
      "email": "sandhiya@psgitech.ac.in"
    },
    {
      "id": "FAC_MAT_227",
      "name": "Dr. M. S. Surendar",
      "department": "Mathematics",
      "designation": "Assistant Professor",
      "specialization": "Nonlinear Dynamics in Biology",
      "email": "surendar.sh@psgitech.ac.in"
    },
    {
      "id": "FAC_MAT_228",
      "name": "Dr. M. Kalaiselvi",
      "department": "Mathematics",
      "designation": "Assistant Professor",
      "specialization": "Epidemic Model, Complex Networks, Mathematical Biology",
      "email": "kalaiselvi.sh@psgitech.ac.in"
    },
    {
      "id": "FAC_MAT_229",
      "name": "Dr. D. Vignesh",
      "department": "Mathematics",
      "designation": "Assistant Professor",
      "specialization": "Wavelet Transform, Machine Learning",
      "email": "vignesh.sh@psgitech.ac.in"
    },
    {
      "id": "FAC_MAT_230",
      "name": "Dr. Y. Mary Christin Otto",
      "department": "Mathematics",
      "designation": "Assistant Professor",
      "specialization": "Functional Analysis",
      "email": "ymco.sh@psgitech.ac.in"
    },
    {
      "id": "FAC_MAT_231",
      "name": "Dr. S. Duraimurugan",
      "department": "Mathematics",
      "designation": "Assistant Professor",
      "specialization": "Graph theory",
      "email": "durai.sh@psgitech.ac.in"
    },
    {
      "id": "FAC_MAT_232",
      "name": "Dr. A. R. Gokul",
      "department": "Mathematics",
      "designation": "Assistant Professor",
      "specialization": "Response Surface Methodology, Probability and statistics",
      "email": "gokul.sh@psgitech.ac.in"
    },
    {
      "id": "FAC_PHY_233",
      "name": "Dr. S. Maruthamuthu",
      "department": "Physics",
      "designation": "Professor & HoD (i/c)",
      "specialization": "Dye sensitized solar cells, Energy storage devices, Thin films",
      "email": "maruthamuthu@psgitech.ac.in"
    },
    {
      "id": "FAC_PHY_234",
      "name": "Dr. D. Thangaraju",
      "department": "Physics",
      "designation": "Associate Professor",
      "specialization": "Nano Biotechnology and Bioimageing",
      "email": "thangaraju@psgitech.ac.in"
    },
    {
      "id": "FAC_PHY_235",
      "name": "Dr. T. K. Abilasha Ramadhas",
      "department": "Physics",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Materials Science, Non-Destructive Testing",
      "email": "abilasha@psgitech.ac.in"
    },
    {
      "id": "FAC_PHY_236",
      "name": "Dr. G. Bhavani",
      "department": "Physics",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Luminescence, Nanomaterials",
      "email": "bhavani@psgitech.ac.in"
    },
    {
      "id": "FAC_PHY_237",
      "name": "Dr. P. K. Kannan",
      "department": "Physics",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Inorganic thin film solar cell, Perovskite, High entropy oxides",
      "email": "kannan@psgitech.ac.in"
    },
    {
      "id": "FAC_PHY_238",
      "name": "Dr. Deepannita Chakraborty",
      "department": "Physics",
      "designation": "Assistant Professor",
      "specialization": "Dilute Magnetic oxide Thin films",
      "email": "deepannita@psgitech.ac.in"
    },
    {
      "id": "FAC_PHY_239",
      "name": "Dr. K. Mariselvam",
      "department": "Physics",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Spectroscopy, Radiation detection, Glasses, Perovskites",
      "email": "mariselvam@psgitech.ac.in"
    },
    {
      "id": "FAC_PHY_240",
      "name": "Dr. S. Gowrishankar",
      "department": "Physics",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Thin Films, Nanomaterials for Optoelectronic Applications",
      "email": "gowrishankar.sh@psgitech.ac.in"
    },
    {
      "id": "FAC_PHY_241",
      "name": "Dr. P. Mathan Kumar",
      "department": "Physics",
      "designation": "Assistant Professor",
      "specialization": "Thin films, Dye Sensitized Solar Cells, Electrochemical storage and conversion",
      "email": "mathankumar.sh@psgitech.ac.in"
    },
    {
      "id": "FAC_PHY_242",
      "name": "Dr. Riza Paul",
      "department": "Physics",
      "designation": "Assistant Professor",
      "specialization": "Photocatalysis, Nanomaterials, Photoelectrochemical studies",
      "email": "rizapaul.sh@psgitech.ac.in"
    },
    {
      "id": "FAC_PHY_243",
      "name": "Dr. T. Abhijith",
      "department": "Physics",
      "designation": "Assistant Professor",
      "specialization": "Nanoscience, Experimental Condensed Matter Physics",
      "email": ""
    },
    {
      "id": "FAC_PHY_244",
      "name": "Dr. M. Veena",
      "department": "Physics",
      "designation": "Assistant Professor",
      "specialization": "Material Science, Electrocatalysis, Nanosensor",
      "email": ""
    },
    {
      "id": "FAC_PHY_245",
      "name": "Dr. Sebin Devasia",
      "department": "Physics",
      "designation": "Assistant Professor",
      "specialization": "Computational Materials Science, Photovoltaics, Photodetectors",
      "email": ""
    },
    {
      "id": "FAC_PHY_246",
      "name": "Dr. P. Atheek",
      "department": "Physics",
      "designation": "Assistant Professor",
      "specialization": "Thin Film, Piezoelectric Materials",
      "email": ""
    },
    {
      "id": "FAC_PHY_247",
      "name": "Dr. S. Gunasekaran",
      "department": "Physics",
      "designation": "Post-Doctoral Fellow",
      "specialization": "Materials science, Energy storage",
      "email": "gunasekaran.sh@psgitech.ac.in"
    },
    {
      "id": "FAC_CHE_248",
      "name": "Dr. G. Latha",
      "department": "Chemistry",
      "designation": "Professor & HoD",
      "specialization": "Polymer Chemistry",
      "email": "latha@psgitech.ac.in"
    },
    {
      "id": "FAC_CHE_249",
      "name": "Dr. K. Balaji",
      "department": "Chemistry",
      "designation": "Professor",
      "specialization": "Polymer Chemistry",
      "email": "balaji@psgitech.ac.in"
    },
    {
      "id": "FAC_CHE_250",
      "name": "Dr. A. Kumaravel",
      "department": "Chemistry",
      "designation": "Associate Professor",
      "specialization": "Electro Chemistry",
      "email": "kumaravel@psgitech.ac.in"
    },
    {
      "id": "FAC_CHE_251",
      "name": "Dr. S. Devaraju",
      "department": "Chemistry",
      "designation": "Associate Professor",
      "specialization": "Polymer Nanocomposites and Hybrid Materials",
      "email": "devaraju@psgitech.ac.in"
    },
    {
      "id": "FAC_CHE_252",
      "name": "Dr. S. Chandirasekar",
      "department": "Chemistry",
      "designation": "Associate Professor",
      "specialization": "Nanoscience, Polymer Chemistry",
      "email": ""
    },
    {
      "id": "FAC_CHE_253",
      "name": "Dr. R. Sasikumar",
      "department": "Chemistry",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Polymer Science",
      "email": "sasikumar@psgitech.ac.in"
    },
    {
      "id": "FAC_CHE_254",
      "name": "Dr. G. Sathiyan",
      "department": "Chemistry",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Organic Chemistry, Organic/Perovskite Solar Cells, Chemosensor Polymers",
      "email": ""
    },
    {
      "id": "FAC_CHE_255",
      "name": "Dr. P. Pradeepkumar",
      "department": "Chemistry",
      "designation": "Assistant Professor (Research)",
      "specialization": "Polymer Chemistry",
      "email": "pradeepkumar.sh@psgitech.ac.in"
    },
    {
      "id": "FAC_CHE_256",
      "name": "Dr. M. Mayakkannan",
      "department": "Chemistry",
      "designation": "Assistant Professor (Research)",
      "specialization": "Nanomaterials for Energy Storage Applications",
      "email": "maya.sh@psgitech.ac.in"
    },
    {
      "id": "FAC_CHE_257",
      "name": "Dr. G. Alagarsamy",
      "department": "Chemistry",
      "designation": "Assistant Professor (Research)",
      "specialization": "Critical Metal Recovery, Wastewater Treatment",
      "email": "asg.sh@psgitech.ac.in"
    },
    {
      "id": "FAC_CHE_258",
      "name": "Dr. S. Manigandan",
      "department": "Chemistry",
      "designation": "Assistant Professor (Research)",
      "specialization": "Polymer Chemistry",
      "email": "manigandan.sh@psgitech.ac.in"
    },
    {
      "id": "FAC_CHE_259",
      "name": "Dr. V. Naveensubramaniam",
      "department": "Chemistry",
      "designation": "Assistant Professor",
      "specialization": "Materials Chemistry",
      "email": "naveenv.sh@psgitech.ac.in"
    },
    {
      "id": "FAC_CHE_260",
      "name": "Dr. S. Prabhu",
      "department": "Chemistry",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Photo/Electrocatalysis for Energy Applications",
      "email": "prabhu@psgitech.ac.in"
    },
    {
      "id": "FAC_CHE_261",
      "name": "Dr. K Arunkumar",
      "department": "Chemistry",
      "designation": "Assistant Professor",
      "specialization": "Fuel Cell, Polymer Chemistry",
      "email": "arunkumar@psgitech.ac.in"
    },
    {
      "id": "FAC_CHE_262",
      "name": "Dr. A. V. Rajalakshmi",
      "department": "Chemistry",
      "designation": "Assistant Professor",
      "specialization": "Fluorescent Sensors, Organic Chemistry",
      "email": "rajalakshmi@psgitech.ac.in"
    },
    {
      "id": "FAC_ENG_263",
      "name": "Dr. K. Pramila",
      "department": "English",
      "designation": "Professor & HOD",
      "specialization": "English Literature, English Language Teaching and Softskills",
      "email": "pramila@psgitech.ac.in"
    },
    {
      "id": "FAC_ENG_264",
      "name": "Dr. S. Gandhimathi",
      "department": "English",
      "designation": "Associate Professor",
      "specialization": "English Language Teaching, English Literature and Educational Psychology",
      "email": "gandhimathi@psgitech.ac.in"
    },
    {
      "id": "FAC_ENG_265",
      "name": "Dr. R. Ravindran",
      "department": "English",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Comparative Literature",
      "email": "ravindran@psgitech.ac.in"
    },
    {
      "id": "FAC_ENG_266",
      "name": "Dr. A. Muthukannan",
      "department": "English",
      "designation": "Assistant Professor",
      "specialization": "American Literature",
      "email": "muthukannan@psgitech.ac.in"
    },
    {
      "id": "FAC_ENG_267",
      "name": "Dr. V. Sutharshan",
      "department": "English",
      "designation": "Assistant Professor",
      "specialization": "ELT and Fiction",
      "email": "sutharshan@psgitech.ac.in"
    },
    {
      "id": "FAC_ENG_268",
      "name": "Dr. K. Satheesh Kumar",
      "department": "English",
      "designation": "Assistant Professor",
      "specialization": "English Language Teaching, Comparative Literature, & Public Speaking",
      "email": "sk.sh@psgitech.ac.in"
    },
    {
      "id": "FAC_ENG_269",
      "name": "Dr. C. Ganesh",
      "department": "English",
      "designation": "Assistant Professor",
      "specialization": "Indian Writing in English, Comparative Literature",
      "email": "ganesh.sh@psgitech.ac.in"
    },
    {
      "id": "FAC_HUM_270",
      "name": "Dr. R. Ravikumar",
      "department": "Humanities",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Agribusiness Management",
      "email": "ravikumar@psgitech.ac.in"
    },
    {
      "id": "FAC_HUM_271",
      "name": "Dr. R. Uma",
      "department": "Humanities",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Human Resource Management",
      "email": "uma@psgitech.ac.in"
    },
    {
      "id": "FAC_HUM_272",
      "name": "Dr. K. Selvamohana",
      "department": "Humanities",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Management (Marketing & Finance)",
      "email": "selvamohana@psgitech.ac.in"
    },
    {
      "id": "FAC_TAM_273",
      "name": "Mr. T. Prakash",
      "department": "Tamil",
      "designation": "Assistant Professor - Tamil",
      "specialization": "Sangam Literature",
      "email": "prakash@psgitech.ac.in"
    },
    {
      "id": "FAC_TAM_274",
      "name": "Ms. S. Lubuna Leilani",
      "department": "Tamil",
      "designation": "Assistant Professor - Tamil",
      "specialization": "Tamil Literature",
      "email": "lls.sh@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_275",
      "name": "Dr. P. Manoj Kumar",
      "department": "Mechanical",
      "designation": "Professor & HOD",
      "specialization": "Heat Transfer Energy",
      "email": "manoj@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_276",
      "name": "Dr. P. V. Mohanram",
      "department": "Mechanical",
      "designation": "Professor",
      "specialization": "Mechanical Engineering",
      "email": "secretary@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_277",
      "name": "Dr. G. Chandramohan",
      "department": "Mechanical",
      "designation": "Professor",
      "specialization": "Mechanical Engineering",
      "email": "gcm@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_278",
      "name": "Dr. N. Saravanakumar",
      "department": "Mechanical",
      "designation": "Professor",
      "specialization": "Engineering Design",
      "email": "principal@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_279",
      "name": "Dr. R. Ramesh",
      "department": "Mechanical",
      "designation": "Professor",
      "specialization": "Engineering Design",
      "email": "ramesh@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_280",
      "name": "Dr. G. Rajeshkumar",
      "department": "Mechanical",
      "designation": "Professor",
      "specialization": "Engineering Design",
      "email": "rajesh@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_281",
      "name": "Dr. S. Thirumalai Kumaran",
      "department": "Mechanical",
      "designation": "Professor",
      "specialization": "Manufacturing Engineering",
      "email": "thirumalaikumaran@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_282",
      "name": "Dr. V Rajkumar",
      "department": "Mechanical",
      "designation": "Associate Professor",
      "specialization": "Manufacturing Engineering",
      "email": "rajkumarv@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_283",
      "name": "Dr. K. Senthil Kumar",
      "department": "Mechanical",
      "designation": "Associate Professor",
      "specialization": "Composite Materials",
      "email": "kmsenthilkumar@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_284",
      "name": "Dr. X. Ajay Vasanth",
      "department": "Mechanical",
      "designation": "Associate Professor",
      "specialization": "Vibration, Smart Materials, IIOT",
      "email": "ajayvasanth@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_285",
      "name": "Dr. S. Nanthakumar",
      "department": "Mechanical",
      "designation": "Associate Professor",
      "specialization": "Lean Manufacturing",
      "email": "snkmech@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_286",
      "name": "Dr. J. Nagarjun",
      "department": "Mechanical",
      "designation": "Associate Professor",
      "specialization": "Engineering Design",
      "email": "nagarjun@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_287",
      "name": "Dr. T. Prem kumar",
      "department": "Mechanical",
      "designation": "Associate Professor",
      "specialization": "Solar energy and Thermal energy",
      "email": "premkumar@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_288",
      "name": "Dr. G. Swaminathan",
      "department": "Mechanical",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Smart Materials, Materials Characterization",
      "email": "swaminathan@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_289",
      "name": "Dr. G. Girish",
      "department": "Mechanical",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Material Science, Manufacturing and Industrial Engg.",
      "email": "girish@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_290",
      "name": "Dr. R. Avinash Kumar",
      "department": "Mechanical",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Thermal & Fluids",
      "email": "avinash@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_291",
      "name": "Dr. S. Jayachandran",
      "department": "Mechanical",
      "designation": "Assistant Professor (Selection Grade)",
      "specialization": "Surface Coating, Material Characterization",
      "email": "jayachandran.me@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_292",
      "name": "Dr. B. Jagadeesh",
      "department": "Mechanical",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Advanced Manufacturing",
      "email": "jagadeesh@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_293",
      "name": "Dr. V. G. Shanmuga Priyan",
      "department": "Mechanical",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Metal Matrix Composites, Non-conventional Machines, Micro-Machines",
      "email": "shanmugapriyan.me@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_294",
      "name": "Dr. Yogesh Prabhu",
      "department": "Mechanical",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Material science",
      "email": "yogeshprabhu.me@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_295",
      "name": "Dr. N. Bhuvanesh",
      "department": "Mechanical",
      "designation": "Assistant Professor (Senior Grade)",
      "specialization": "Thermal Engineering",
      "email": "bhuvanesh.me@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_296",
      "name": "Mr. V. Vijai Kaarthi",
      "department": "Mechanical",
      "designation": "Assistant Professor",
      "specialization": "Energy Engineering",
      "email": "vvk.mech@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_297",
      "name": "Dr. P. Abhilash",
      "department": "Mechanical",
      "designation": "Assistant Professor (Research)",
      "specialization": "Materials Joining, Additive manufacturing",
      "email": "abhilash.me@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_298",
      "name": "Dr. M. Dinesh Kumar",
      "department": "Mechanical",
      "designation": "Assistant Professor (Research)",
      "specialization": "Fuel Cells",
      "email": "mdk.me@psgitech.ac.in"
    },
    {
      "id": "FAC_MEC_299",
      "name": "Dr. G. Sathyamoorthy",
      "department": "Mechanical",
      "designation": "Assistant Professor (Research)",
      "specialization": "Brake Friction Materials, Polymer Composites",
      "email": "sathyamoorthy.me@psgitech.ac.in"
    }
  ]
},
    sampleProject: {
  "metadata": {
    "collegeName": "PSG Institute of Technology and Applied Research",
    "departmentName": "Department of Electronics and Communication Engineering",
    "academicYear": "2026-2027",
    "workingDays": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "periodsPerDay": 8
  },
  "departmentConfig": {
    "totalClasses": 8,
    "availableClassrooms": 6,
    "classrooms": [
      {
        "room": "101",
        "capacity": 65
      },
      {
        "room": "102",
        "capacity": 65
      },
      {
        "room": "103",
        "capacity": 65
      },
      {
        "room": "104",
        "capacity": 65
      },
      {
        "room": "201",
        "capacity": 60
      },
      {
        "room": "202",
        "capacity": 60
      }
    ]
  },
  "classes": [
    {
      "code": "1113",
      "year": 1,
      "branchCode": 1,
      "branch": "ECE",
      "division": "A",
      "semester": 3,
      "strength": 60
    },
    {
      "code": "1123",
      "year": 1,
      "branchCode": 1,
      "branch": "ECE",
      "division": "B",
      "semester": 3,
      "strength": 58
    },
    {
      "code": "2115",
      "year": 2,
      "branchCode": 1,
      "branch": "ECE",
      "division": "A",
      "semester": 5,
      "strength": 60
    },
    {
      "code": "2125",
      "year": 2,
      "branchCode": 1,
      "branch": "ECE",
      "division": "B",
      "semester": 5,
      "strength": 58
    },
    {
      "code": "2215",
      "year": 2,
      "branchCode": 2,
      "branch": "VLSI",
      "division": "A",
      "semester": 5,
      "strength": 55
    },
    {
      "code": "3115",
      "year": 3,
      "branchCode": 1,
      "branch": "ECE",
      "division": "A",
      "semester": 5,
      "strength": 62
    },
    {
      "code": "3215",
      "year": 3,
      "branchCode": 2,
      "branch": "VLSI",
      "division": "A",
      "semester": 5,
      "strength": 54
    },
    {
      "code": "4117",
      "year": 4,
      "branchCode": 1,
      "branch": "ECE",
      "division": "A",
      "semester": 7,
      "strength": 56
    }
  ],
  "facultyAvailability": {
    "Dr. S. Aramuthakannan": {
      "department": "Mathematics",
      "isOtherDept": true,
      "availableSlots": {
        "Monday": [
          1,
          2,
          3,
          4
        ],
        "Tuesday": [
          1,
          2,
          5,
          6
        ],
        "Wednesday": [
          2,
          3,
          4,
          5
        ],
        "Thursday": [
          1,
          2,
          3,
          4
        ],
        "Friday": [
          3,
          4,
          5,
          6
        ]
      }
    },
    "Dr. P. Chinnaraj": {
      "department": "Mathematics",
      "isOtherDept": true,
      "availableSlots": {
        "Monday": [
          3,
          4,
          5,
          6
        ],
        "Tuesday": [
          1,
          2,
          3,
          4
        ],
        "Wednesday": [
          1,
          2,
          5,
          6
        ],
        "Thursday": [
          5,
          6,
          7,
          8
        ],
        "Friday": [
          1,
          2,
          3,
          4
        ]
      }
    },
    "Dr. B. Gomathy": {
      "department": "CSE",
      "isOtherDept": true,
      "availableSlots": {
        "Monday": [
          1,
          2,
          5,
          6
        ],
        "Tuesday": [
          3,
          4,
          7,
          8
        ],
        "Wednesday": [
          1,
          2,
          3,
          4
        ],
        "Thursday": [
          1,
          2,
          5,
          6
        ],
        "Friday": [
          5,
          6,
          7,
          8
        ]
      }
    }
  },
  "classConfigurations": {
    "1113": {
      "subjects": [
        {
          "code": "MA3355",
          "name": "Random Processes and Linear Algebra",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. S. Aramuthakannan"
          ]
        },
        {
          "code": "CS3353",
          "name": "C Programming and Data Structures",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. B. Gomathy"
          ]
        },
        {
          "code": "EC3354",
          "name": "Signals and Systems",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. C. Arvind"
          ]
        },
        {
          "code": "EC3353",
          "name": "Electronic Devices and Circuits",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. D. Selvakumar"
          ]
        },
        {
          "code": "EC3351",
          "name": "Control Systems",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. G. Santhanamari"
          ]
        },
        {
          "code": "EC3361",
          "name": "Electronic Devices and Circuits Laboratory",
          "type": "Lab",
          "hours": 3,
          "continuous": 3,
          "labName": "Circuits Lab",
          "faculty": [
            "Dr. D. Selvakumar",
            "Dr. B. A. Sapna"
          ]
        },
        {
          "code": "CS3362",
          "name": "C Programming and Data Structures Laboratory",
          "type": "Lab",
          "hours": 3,
          "continuous": 3,
          "labName": "Computing Lab",
          "faculty": [
            "Dr. B. Gomathy"
          ]
        },
        {
          "code": "GE3361",
          "name": "Professional Development",
          "type": "Elective Course",
          "hours": 2,
          "faculty": [
            "Dr. K. Pramila"
          ]
        },
        {
          "code": "FREE",
          "name": "Free Period",
          "type": "Free Period",
          "hours": 7,
          "faculty": []
        }
      ],
      "simultaneousGroups": []
    },
    "1123": {
      "subjects": [
        {
          "code": "MA3355",
          "name": "Random Processes and Linear Algebra",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. P. Chinnaraj"
          ]
        },
        {
          "code": "CS3353",
          "name": "C Programming and Data Structures",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. B. Gomathy"
          ]
        },
        {
          "code": "EC3354",
          "name": "Signals and Systems",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. P. Sridhar"
          ]
        },
        {
          "code": "EC3353",
          "name": "Electronic Devices and Circuits",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. M. Deepa"
          ]
        },
        {
          "code": "EC3351",
          "name": "Control Systems",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. G. Santhanamari"
          ]
        },
        {
          "code": "EC3361",
          "name": "Electronic Devices and Circuits Laboratory",
          "type": "Lab",
          "hours": 3,
          "continuous": 3,
          "labName": "Circuits Lab",
          "faculty": [
            "Dr. M. Deepa",
            "Dr. B. A. Sapna"
          ]
        },
        {
          "code": "CS3362",
          "name": "C Programming and Data Structures Laboratory",
          "type": "Lab",
          "hours": 3,
          "continuous": 3,
          "labName": "Computing Lab",
          "faculty": [
            "Dr. B. Gomathy"
          ]
        },
        {
          "code": "GE3361",
          "name": "Professional Development",
          "type": "Elective Course",
          "hours": 2,
          "faculty": [
            "Dr. S. Gandhimathi"
          ]
        },
        {
          "code": "FREE",
          "name": "Free Period",
          "type": "Free Period",
          "hours": 7,
          "faculty": []
        }
      ],
      "simultaneousGroups": []
    },
    "2115": {
      "subjects": [
        {
          "code": "EC3501",
          "name": "Wireless Communication",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. B. Tharini"
          ]
        },
        {
          "code": "EC3552",
          "name": "VLSI and Chip Design",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. P. Vijayakumar"
          ]
        },
        {
          "code": "EC3551",
          "name": "Transmission Lines and RF Systems",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. S. P. Cowsigan"
          ]
        },
        {
          "code": "EC3492",
          "name": "Digital Signal Processing",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. M. Jothibasu"
          ]
        },
        {
          "code": "EC3352",
          "name": "Digital Systems Design",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. K. Paldurai"
          ]
        },
        {
          "code": "EC3561",
          "name": "VLSI Laboratory",
          "type": "Lab",
          "hours": 3,
          "continuous": 3,
          "labName": "VLSI Lab",
          "faculty": [
            "Dr. P. Vijayakumar",
            "Dr. M. Deepa"
          ]
        },
        {
          "code": "CEC366",
          "name": "Image Processing",
          "type": "Elective Course",
          "hours": 4,
          "faculty": [
            "Dr. J. S. Sujin"
          ]
        },
        {
          "code": "FREE",
          "name": "Free Period",
          "type": "Free Period",
          "hours": 8,
          "faculty": []
        }
      ],
      "simultaneousGroups": []
    },
    "2125": {
      "subjects": [
        {
          "code": "EC3501",
          "name": "Wireless Communication",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. P. Sakthivel"
          ]
        },
        {
          "code": "EC3552",
          "name": "VLSI and Chip Design",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. M. Jayasanthi"
          ]
        },
        {
          "code": "EC3551",
          "name": "Transmission Lines and RF Systems",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. S. P. Cowsigan"
          ]
        },
        {
          "code": "EC3492",
          "name": "Digital Signal Processing",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. P. Sridhar"
          ]
        },
        {
          "code": "EC3352",
          "name": "Digital Systems Design",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. S. Padmapriya"
          ]
        },
        {
          "code": "EC3561",
          "name": "VLSI Laboratory",
          "type": "Lab",
          "hours": 3,
          "continuous": 3,
          "labName": "VLSI Lab",
          "faculty": [
            "Dr. M. Jayasanthi",
            "Dr. S. Padmapriya"
          ]
        },
        {
          "code": "CEC366",
          "name": "Image Processing",
          "type": "Elective Course",
          "hours": 4,
          "faculty": [
            "Dr. J. S. Sujin"
          ]
        },
        {
          "code": "FREE",
          "name": "Free Period",
          "type": "Free Period",
          "hours": 8,
          "faculty": []
        }
      ],
      "simultaneousGroups": []
    },
    "2215": {
      "subjects": [
        {
          "code": "VL3401",
          "name": "Digital VLSI Design",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. S. Sridevi Sathya Priya"
          ]
        },
        {
          "code": "VL3501",
          "name": "CMOS Analog IC Design",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. K. Paldurai"
          ]
        },
        {
          "code": "EC3552",
          "name": "VLSI and Chip Design",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. P. Vijayakumar"
          ]
        },
        {
          "code": "VL3702",
          "name": "Hardware Description Languages",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. J. R. Dinesh Kumar"
          ]
        },
        {
          "code": "CEC370",
          "name": "Low Power IC Design",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. S. Padmapriya"
          ]
        },
        {
          "code": "EC3561",
          "name": "VLSI Laboratory",
          "type": "Lab",
          "hours": 3,
          "continuous": 3,
          "labName": "VLSI Lab",
          "faculty": [
            "Dr. S. Sridevi Sathya Priya",
            "Dr. J. R. Dinesh Kumar"
          ]
        },
        {
          "code": "CEC342",
          "name": "Mixed Signal IC Design Testing",
          "type": "Elective Course",
          "hours": 4,
          "faculty": [
            "Dr. K. Paldurai"
          ]
        },
        {
          "code": "FREE",
          "name": "Free Period",
          "type": "Free Period",
          "hours": 8,
          "faculty": []
        }
      ],
      "simultaneousGroups": []
    },
    "3115": {
      "subjects": [
        {
          "code": "EC3501",
          "name": "Wireless Communication",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. B. Tharini"
          ]
        },
        {
          "code": "EC3552",
          "name": "VLSI and Chip Design",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. M. Jayasanthi"
          ]
        },
        {
          "code": "EC3551",
          "name": "Transmission Lines and RF Systems",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. S. P. Cowsigan"
          ]
        },
        {
          "code": "EC3492",
          "name": "Digital Signal Processing",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. M. Jothibasu"
          ]
        },
        {
          "code": "ET3491",
          "name": "Embedded Systems and IOT Design",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. G. Santhanamari"
          ]
        },
        {
          "code": "EC3561",
          "name": "VLSI Laboratory",
          "type": "Lab",
          "hours": 3,
          "continuous": 3,
          "labName": "VLSI Lab",
          "faculty": [
            "Dr. M. Jayasanthi",
            "Dr. M. Priyadharshini"
          ]
        },
        {
          "code": "CEC335",
          "name": "Antenna Design",
          "type": "Honours Course",
          "hours": 4,
          "faculty": [
            "Dr. S. P. Cowsigan"
          ]
        },
        {
          "code": "FREE",
          "name": "Free Period",
          "type": "Free Period",
          "hours": 8,
          "faculty": []
        }
      ],
      "simultaneousGroups": []
    },
    "3215": {
      "subjects": [
        {
          "code": "VL3601",
          "name": "Low Power VLSI Design",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. S. Padmapriya"
          ]
        },
        {
          "code": "VL3501",
          "name": "CMOS Analog IC Design",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. K. Paldurai"
          ]
        },
        {
          "code": "VL3701",
          "name": "VLSI Testing and Verification",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. M. Priyadharshini"
          ]
        },
        {
          "code": "VL3702",
          "name": "Hardware Description Languages",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. J. R. Dinesh Kumar"
          ]
        },
        {
          "code": "CEC362",
          "name": "VLSI Testing and Design For Testability",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. S. Sridevi Sathya Priya"
          ]
        },
        {
          "code": "EC3561",
          "name": "VLSI Laboratory",
          "type": "Lab",
          "hours": 3,
          "continuous": 3,
          "labName": "VLSI Lab",
          "faculty": [
            "Dr. M. Priyadharshini",
            "Dr. K. Paldurai"
          ]
        },
        {
          "code": "CEC370",
          "name": "Low Power IC Design",
          "type": "Honours Course",
          "hours": 4,
          "faculty": [
            "Dr. S. Padmapriya"
          ]
        },
        {
          "code": "FREE",
          "name": "Free Period",
          "type": "Free Period",
          "hours": 8,
          "faculty": []
        }
      ],
      "simultaneousGroups": []
    },
    "4117": {
      "subjects": [
        {
          "code": "GE3791",
          "name": "Human Values and Ethics",
          "type": "Main Course",
          "hours": 4,
          "faculty": [
            "Dr. R. Ravikumar"
          ]
        },
        {
          "code": "GE3751",
          "name": "Principles of Management",
          "type": "Main Course",
          "hours": 4,
          "faculty": [
            "Dr. R. Uma"
          ]
        },
        {
          "code": "CEC352",
          "name": "Satellite Communication",
          "type": "Elective Course",
          "hours": 4,
          "faculty": [
            "Dr. B. Tharini"
          ]
        },
        {
          "code": "CEC345",
          "name": "Optical Communication & Networks",
          "type": "Elective Course",
          "hours": 4,
          "faculty": [
            "Dr. P. Sakthivel"
          ]
        },
        {
          "code": "CEC371",
          "name": "Massive MIMO Networks",
          "type": "Main Course",
          "hours": 5,
          "faculty": [
            "Dr. C. Arvind"
          ]
        },
        {
          "code": "EC3711",
          "name": "Summer internship",
          "type": "Main Course",
          "hours": 4,
          "faculty": [
            "Dr. P. Vijayakumar"
          ]
        },
        {
          "code": "VL3711",
          "name": "Cadence / Synopsys EDA Lab",
          "type": "Lab",
          "hours": 3,
          "continuous": 3,
          "labName": "EDA Lab",
          "faculty": [
            "Dr. J. R. Dinesh Kumar",
            "Dr. M. Priyadharshini"
          ]
        },
        {
          "code": "FREE",
          "name": "Free Period",
          "type": "Free Period",
          "hours": 12,
          "faculty": []
        }
      ],
      "simultaneousGroups": [
        {
          "id": "SIM_GROUP_1",
          "name": "Professional Elective Vertical Pool",
          "subjects": [
            "CEC352",
            "CEC345"
          ]
        }
      ]
    }
  }
},

    getBranchMap: function() {
      const map = {};
      this.branches.forEach(b => {
        map[b.code] = b;
      });
      return map;
    },

    getFacultyByDepartment: function(deptName) {
      if (!this.facultyData || !this.facultyData.departments) return [];
      if (!deptName) return this.facultyData.list || [];
      return this.facultyData.departments[deptName] || [];
    },

    getAllFaculty: function() {
      return (this.facultyData && this.facultyData.list) ? this.facultyData.list : [];
    },

    getAllDepartments: function() {
      if (!this.facultyData || !this.facultyData.departments) return [];
      return Object.keys(this.facultyData.departments);
    }
  };

  window.AppData = AppData;
})(typeof window !== 'undefined' ? window : this);
