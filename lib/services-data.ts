export interface Service {
    id: number
    title: string
    description: string
    category: string
    price: number
    duration: string
    image_url: string
    why_use_service: string
    what_if_not_used: string
    before_appointment: string
    after_service: string
    is_active: boolean
    faqs: Array<{
        question: string
        answer: string
    }>
}

export const servicesData: Service[] = [
    {
        id: 1,
        title: "Preventive Dentistry",
        description:
            "Focuses on maintaining healthy teeth to prevent issues like cavities, gum disease, and enamel wear. Involves regular dental check-ups, cleanings, and good oral hygiene practices at home.",
        category: "preventive",
        price: 2500,
        duration: "30",
        image_url: "https://img.freepik.com/free-photo/dentist-hands-working-young-woman-patient-with-dental-tools_613910-21162.jpg?semt=ais_hybrid&w=740&q=80",
        why_use_service:
            "Prevents dental problems before they start, saving time and money on complex treatments.\nMaintains overall health, as poor oral hygiene is linked to heart disease and diabetes.\nEnsures strong, healthy teeth for children and preserves natural teeth in adults.\nEnhances smile aesthetics and boosts confidence through clean, white teeth.",
        what_if_not_used:
            "Without preventive care, small dental issues can develop into serious problems requiring expensive treatments.\nGum disease and tooth decay can progress, leading to tooth loss and systemic health issues.\nPoor oral health is linked to cardiovascular disease, diabetes, and other serious conditions.",
        before_appointment:
            "Brush and floss your teeth before the appointment.\nBring a list of any medications you're currently taking.\nArrive a few minutes early to complete any necessary paperwork.",
        after_service:
            "Continue brushing twice daily with fluoride toothpaste and flossing once daily.\nFollow specific instructions, like avoiding food for 30min after the treatment is done.\nSchedule your next visit as recommended to maintain continuity of care.",
        is_active: true,
        faqs: [
            {
                question: "What is Preventive Dentistry?",
                answer:
                    "Focuses on maintaining healthy teeth to prevent issues like cavities, gum disease, and enamel wear.\nInvolves regular dental check-ups, cleanings, and good oral hygiene practices at home.\nIncludes treatments like fluoride applications and dental sealants, especially for children.",
            },
            {
                question: "Why is Preventive Dentistry necessary?",
                answer:
                    "Prevents dental problems before they start, saving time and money on complex treatments.\nMaintains overall health, as poor oral hygiene is linked to heart disease and diabetes.\nEnsures strong, healthy teeth for children and preserves natural teeth in adults.\nEnhances smile aesthetics and boosts confidence through clean, white teeth.",
            },
            {
                question: "How many visits are needed for Preventive Dentistry?",
                answer:
                    "Typically 1-2 visits per year for routine check-ups and cleanings.\nFrequency depends on individual oral health, as assessed by your dentist.\nSome patients with higher risk (e.g., gum disease) may need more frequent visits.",
            },
            {
                question: "What should I do after Preventive Dentistry?",
                answer:
                    "Continue brushing twice daily with fluoride toothpaste and flossing once daily.\nFollow specific instruction, Like avoiding food for 30min after the treatment is done.\nSchedule your next visit as recommended to maintain continuity of care.",
            },
            {
                question: "Who benefits most from Preventive Dentistry?",
                answer:
                    "Children, to ensure strong development of permanent teeth.\nAdults, to maintain natural teeth and prevent age-related dental issues.\nEveryone, as it reduces the risk of systemic health problems linked to oral bacteria.",
            },
            {
                question: "What specific treatments are included?",
                answer:
                    "Dental examinations to detect early signs of decay or abnormalities.\nProfessional cleanings to remove tartar and prevent gum disease.\nFluoride treatments and sealants for cavity prevention, especially in kids.\nXray to detect the proximal caries.",
            },
            {
                question: "How long does a Preventive Dentistry visit take?",
                answer:
                    "Routine check-ups and cleanings take 30 minutes.\nAdditional treatments like sealants may extend the visit slightly.",
            },
        ],
    },
    {
        id: 2,
        title: "Scaling & Polishing",
        description:
            "Scaling removes plaque and tartar from teeth and below the gumline using specialized tools. Polishing smooths tooth surfaces, reducing future plaque buildup and enhancing shine.",
        category: "preventive",
        price: 1500,
        duration: "30",
        image_url: "https://media.istockphoto.com/id/1356189685/photo/oral-hygiene-dentist-doing-scaling-and-brushing-procedure.jpg?s=612x612&w=0&k=20&c=jJUlty_vg9ga3qF_Vg2w98pHxPzhiXX3xdIOOB39WsE=",
        why_use_service:
            "Prevents gum disease by removing tartar that harbors harmful bacteria.\nReduces the risk of cavities by eliminating plaque buildup.\nImproves bad breath and maintains healthy, aesthetically pleasing teeth.\nSupports overall health by reducing oral bacteria linked to systemic issues.",
        what_if_not_used:
            "Tartar buildup can lead to gum disease and eventual tooth loss.\nBad breath and stained teeth can affect confidence and social interactions.\nUntreated plaque can cause cavities and more serious dental problems.",
        before_appointment:
            "Brush your teeth before the appointment.\nInform the dentist about any sensitivity issues.\nAvoid eating sticky or hard foods before the procedure.",
        after_service:
            "Avoid hot, cold, or spicy foods for 24 hours.\nRinse with saltwater for 7 days to promote healing of gums.\nMaintain daily brushing and flossing to prolong results.\nIf any teeth sensitive, please contact our dental clinic.",
        is_active: true,
        faqs: [
            {
                question: "What is Scaling & Polishing?",
                answer:
                    "Scaling removes plaque and tartar from teeth and below the gumline using specialized tools.\nPolishing smooths tooth surfaces, reducing future plaque buildup and enhancing shine.\nPerformed by a dentist or hygienist as part of routine dental care.",
            },
            {
                question: "Why is Scaling & Polishing necessary?",
                answer:
                    "Prevents gum disease by removing tartar that harbors harmful bacteria.\nReduces the risk of cavities by eliminating plaque buildup.\nImproves bad breath and maintains healthy, aesthetically pleasing teeth.\nSupports overall health by reducing oral bacteria linked to systemic issues.",
            },
            {
                question: "How many visits are needed for Scaling & Polishing?",
                answer:
                    "Typically one visit per session, recommended every 6-12 months.\nPatients with heavy tartar or gum issues may require additional sessions.\nFollow-up visits may be needed for monitoring gum health.",
            },
            {
                question: "What should I do after Scaling & Polishing?",
                answer:
                    "Avoid hot, cold, or spicy foods for 24 hours.\nRinse with saltwater for 7 days to promote healing of gums.\nMaintain daily brushing and flossing to prolong results.\nIf any teeth sensitive, please contact our dental clinic.",
            },
            {
                question: "Does Scaling & Polishing hurt?",
                answer:
                    "Generally comfortable, with mild discomfort possible during deep cleaning.\nLocal anesthesia can be used for sensitive patients.\nPost-procedure sensitivity is temporary and manageable with care.",
            },
            {
                question: "What types of deposits are addressed?",
                answer:
                    "Minor deposits (light plaque) require less time.\nIntermediate or major deposits (heavy tartar) may need deeper scaling.\nProcedure is customized based on the extent of buildup.",
            },
            {
                question: "How long does Scaling & Polishing take?",
                answer:
                    "Standard session takes 15-30 minutes.\nHeavy tartar removal may extend, following up with the next visit.",
            },
        ],
    },
    {
        id: 3,
        title: "Teeth Whitening / Teeth Bleaching",
        description:
            "A cosmetic procedure to lighten teeth by removing stains and discoloration. Uses safe bleaching gels applied in-office, activated by light (non-laser).",
        category: "cosmetic",
        price: 8000,
        duration: "45",
        image_url: "https://images.pexels.com/photos/3779706/pexels-photo-3779706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        why_use_service:
            "Boosts confidence by improving the appearance of stained or yellowed teeth.\nAddresses discoloration from coffee, tea, wine, smoking, or aging.\nProvides a brighter, more youthful smile for cosmetic purposes.\nNot essential for health but enhances overall dental aesthetics.",
        what_if_not_used:
            "Stained or yellowed teeth can affect self-confidence and social interactions.\nDiscoloration may worsen over time without treatment.\nProfessional whitening is more effective than over-the-counter options.",
        before_appointment:
            "Need to go for regular check up and perform Scaling and polishing.\nAvoid staining foods and drinks 24 hours before treatment.\nDiscuss any sensitivity concerns with the dentist.",
        after_service:
            "Avoid colored foods (like betel), drinks (like red wine), and tobacco for 1 week strictly to prevent restaining.\nStrictly avoid staining food last the whitening longer period of time.\nUse sensitivity toothpaste if teeth feel temporarily sensitive.\nAvoid colored foods for better long lasting results.\nMaintain regular oral hygiene to prolong whitening results.",
        is_active: true,
        faqs: [
            {
                question: "What is Teeth Whitening?",
                answer:
                    "A cosmetic procedure to lighten teeth by removing stains and discoloration.\nUses safe bleaching gels applied in-office, activated by light (non-laser).\nEnhances smile aesthetics without altering tooth structure.",
            },
            {
                question: "Why is Teeth Whitening necessary?",
                answer:
                    "Boosts confidence by improving the appearance of stained or yellowed teeth.\nAddresses discoloration from coffee, tea, wine, smoking, or aging.\nProvides a brighter, more youthful smile for cosmetic purposes.\nNot essential for health but enhances overall dental aesthetics.",
            },
            {
                question: "How many visits are needed for Teeth Whitening?",
                answer:
                    "Typically one in-office session for immediate results.\nAdditional visits may be needed for touch-ups or maintenance.",
            },
            {
                question: "What should I do before teeth whitening?",
                answer: "Need to go for regular check up and perform Scaling and polishing.",
            },
            {
                question: "What should I do after Teeth Whitening?",
                answer:
                    "Avoid colored foods (like.besar), drinks(like.red wine), and tobacco for 1 week strictly to prevent restaining\nStrictly avoid staining food last the whitening longer period of time\nUse sensitivity toothpaste if teeth feel temporarily sensitive.\nAvoid colored foods for better long lasting results.\nMaintain regular oral hygiene to prolong whitening results.",
            },
            {
                question: "Will Teeth Whitening hurt?",
                answer:
                    "Generally painless, with temporary sensitivity (rare).\nSensitivity can be managed with desensitizing products.\nInform the dentist if you have a history of sensitive teeth.",
            },
            {
                question: "How long do Teeth Whitening results last?",
                answer:
                    "Results last 1-3 years, depending on diet and habits like smoking.\nRegular touch-ups can extend the duration of whiteness.\nAvoiding staining agents helps maintain results longer.",
            },
            {
                question: "How long does a Teeth Whitening session take?",
                answer:
                    "In-office treatment takes about 45 minutes.\nMultiple cycles may be applied in one session for deeper stains.",
            },
        ],
    },
    {
        id: 4,
        title: "Extractions",
        description:
            "Removal of a tooth from its socket due to damage, decay, or crowding. Performed under local anesthesia for comfort. Includes simple extractions or surgical removal for impacted teeth.",
        category: "oral surgery",
        price: 3000,
        duration: "30",
        image_url: "https://images.pexels.com/photos/6627345/pexels-photo-6627345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        why_use_service:
            "Prevents spread of infection from decayed or abscessed teeth.\nRelieves pain caused by damaged or impacted teeth.\nCreates space for orthodontic treatment or to remove wisdom teeth.\nAvoids complications like cysts or damage to adjacent teeth.",
        what_if_not_used:
            "Infected teeth can spread bacteria to other parts of the body.\nSevere pain and swelling can worsen without treatment.\nDamaged teeth can affect adjacent healthy teeth and overall oral health.",
        before_appointment:
            "Eat a heavy meal before a procedure under local anesthesia to avoid nausea and as patient is unable to eat food for 30min.\nInform the dentist about medications, especially blood thinners.\nArrange for someone to drive you home if sedation is used.",
        after_service:
            "Bite on gauze to control bleeding for 30-60 minutes.\nApply ice packs to reduce swelling for the first 24 hours.\nUnable to spit strictly for the first 24hrs.\nEat soft foods and avoid straws, smoking, or vigorous rinsing for 48 hours.",
        is_active: true,
        faqs: [
            {
                question: "What is Tooth Extraction?",
                answer:
                    "Removal of a tooth from its socket due to damage, decay, or crowding.\nPerformed under local anesthesia for comfort.\nIncludes simple extractions or surgical removal for impacted teeth.",
            },
            {
                question: "Why is Tooth Extraction necessary?",
                answer:
                    "Prevents spread of infection from decayed or abscessed teeth.\nRelieves pain caused by damaged or impacted teeth.\nCreates space for orthodontic treatment or to remove wisdom teeth.\nAvoids complications like cysts or damage to adjacent teeth.",
            },
            {
                question: "How many visits are needed for Tooth Extraction?",
                answer:
                    "Usually one visit for the procedure.\nA follow-up visit may be needed to check healing or remove stitches.\nComplex cases (e.g., Dental Cyst) may require additional planning.",
            },
            {
                question: "What should I do before coming for Tooth Extraction?",
                answer:
                    "Eat a heavy meal before a procedure under local anesthesia to avoid nausea and as patient is unable to eat food for 30min.\nInform the dentist about medications, especially blood thinners.",
            },
            {
                question: "What should I do after Tooth Extraction?",
                answer:
                    "Bite on gauze to control bleeding for 30-60 minutes.\nApply ice packs to reduce swelling for the first 24 hours.\nUnable to split strictly for the first 24hrs.\nEat soft foods and avoid straws, smoking, or vigorous rinsing for 48 hours.",
            },
            {
                question: "Will Tooth Extraction hurt?",
                answer:
                    "Local anesthesia ensures no pain during the procedure, only pressure.\nPost-extraction discomfort is manageable with prescribed painkillers.\nDry socket (rare) can cause pain but is preventable with proper care.",
            },
            {
                question: "What types of Extractions are performed?",
                answer:
                    "Simple: For loose or fully erupted teeth, quick and straightforward.\nDifficult: For partially erupted teeth requiring more effort.\nComplicated/Impacted: Surgical removal for teeth trapped in bone, like wisdom teeth.",
            },
            {
                question: "How long does Tooth Extraction take?",
                answer: "Simple extractions take 20-30 minutes.\nComplicated extractions may take up to 40 minutes.",
            },
        ],
    },
    {
        id: 5,
        title: "Root Canal Treatment",
        description:
            "Procedure to save an infected or decayed tooth by removing damaged pulp. Involves cleaning and shaping the root canal, then sealing it. Restores tooth function with a filling or crown.",
        category: "endodontics",
        price: 12000,
        duration: "60",
        image_url: "https://media.istockphoto.com/id/471478846/photo/overview-of-dental-caries-prevention.jpg?s=612x612&w=0&k=20&c=tSgUr5_VBk5krAeqnhVfhHIHUX4wr2htdjskXqbut8I=",
        why_use_service:
            "Treats infections or deep decay to prevent tooth loss.\nRelieves severe toothache caused by pulp inflammation.\nPreserves the natural tooth, avoiding extraction.\nPrevents spread of infection to surrounding tissues or bone.",
        what_if_not_used:
            "Infected tooth pulp can lead to abscess and severe pain.\nInfection can spread to surrounding tissues and bone.\nEventual tooth loss may require more expensive replacement options.",
        before_appointment:
            "Take prescribed antibiotics if recommended by the dentist.\nEat a meal before the procedure as you may have difficulty eating afterward.\nArrange time off work as you may experience some discomfort.",
        after_service:
            "Avoid chewing on the treated tooth until fully restored else the tooth might get fractured.\nTake prescribed pain relievers for any post-treatment soreness.\nReturn for a crown or permanent filling as advised.",
        is_active: true,
        faqs: [
            {
                question: "What is Root Canal Treatment?",
                answer:
                    "Procedure to save an infected or decayed tooth by removing damaged pulp.\nInvolves cleaning and shaping the root canal, then sealing it.\nRestores tooth function with a filling or crown.",
            },
            {
                question: "Why is Root Canal Treatment necessary?",
                answer:
                    "Treats infections or deep decay to prevent tooth loss.\nRelieves severe toothache caused by pulp inflammation.\nPreserves the natural tooth, avoiding extraction.\nPrevents spread of infection to surrounding tissues or bone.",
            },
            {
                question: "How many visits are needed for Root Canal Treatment?",
                answer:
                    "Typically 1-3 visits, depending on infection severity and tooth complexity.\nSingle-visit treatment is possible for straightforward cases.\nFollow-up for permanent restoration (e.g., crown) may be needed.",
            },
            {
                question: "What should I do after Root Canal Treatment?",
                answer:
                    "Avoid chewing on the treated tooth until fully restored else the tooth might get fractured.\nTake prescribed pain relievers for any post-treatment soreness.\nReturn for a crown or permanent filling as advised.",
            },
            {
                question: "Will Root Canal Treatment hurt?",
                answer:
                    "Performed under local anesthesia, so no pain during the procedure.\nMild soreness may occur for a few days during or after the post-treatment.\nModern techniques ensure a comfortable experience.",
            },
            {
                question: "What steps are involved in Root Canal Treatment?",
                answer:
                    "Access the pulp chamber and remove infected tissue.\nClean and shape the root canals to remove bacteria.\nFill canals with biocompatible material and seal the tooth.",
            },
            {
                question: "How long does Root Canal Treatment take?",
                answer: "Each visit lasts 1, depending on complexity.\nMultiple visits may be spaced over days or weeks.",
            },
        ],
    },
    {
        id: 6,
        title: "Fillings",
        description:
            "Restoration to repair cavities or minor tooth damage. Involves removing decayed material and filling with durable material. Restores tooth function and prevents further decay.",
        category: "restorative",
        price: 2000,
        duration: "45",
        image_url: "https://media.istockphoto.com/id/1150025702/photo/close-up-of-open-mouth-during-oral-checkup-teeth-at-the-dentist-office-macro-shot-of-white.jpg?s=612x612&w=0&k=20&c=cgpHoLaKjcvfhSzUnxh3O-UjqH2-LmKpZXw0AK5HcE0=",
        why_use_service:
            "Stops the progression of tooth decay to save the tooth.\nRestores chewing ability and maintains proper bite alignment.\nPrevents sensitivity or pain from exposed tooth layers.\nProtects the tooth from further damage or infection.",
        what_if_not_used:
            "Cavities will continue to grow and may reach the tooth's nerve.\nUntreated decay can lead to pain, infection, and eventual tooth loss.\nSmall cavities are easier and less expensive to treat than large ones.",
        before_appointment:
            "Brush your teeth before the appointment.\nInform the dentist about any allergies to dental materials.\nEat a meal beforehand as the area may be numb for a few hours.",
        after_service:
            "Avoid eating or drinking until anesthesia wears off (1-2 hours).\nAvoid chewing on that side for the first 24 hours, if silver amalgam or glass ionomer (GIC) is placed.\nContact the dentist if the filling feels high or causes pain.",
        is_active: true,
        faqs: [
            {
                question: "What is a Dental Filling?",
                answer:
                    "Restoration to repair cavities or minor tooth damage.\nInvolves removing decayed material and filling with durable material.\nRestores tooth function and prevents further decay.",
            },
            {
                question: "Why is a Dental Filling necessary?",
                answer:
                    "Stops the progression of tooth decay to save the tooth.\nRestores chewing ability and maintains proper bite alignment.\nPrevents sensitivity or pain from exposed tooth layers.\nProtects the tooth from further damage or infection.",
            },
            {
                question: "How many visits are needed for a Dental Filling?",
                answer:
                    "Typically one visit for most fillings.\nLarge or complex fillings(Deep Caries Managment) may require a follow-up for adjustments after 6 months.\nTemporary fillings may need a second visit for permanent placement.",
            },
            {
                question: "What should I do after a Dental Filling?",
                answer:
                    "Avoid eating or drinking until anesthesia wears off (1-2 hours).\nAvoid chewing on that side for the first 24 hours, if silver amalgam or glass ionomer(GIC) is placed.\nContact the dentist if the filling feels high or causes pain.",
            },
            {
                question: "What materials are used for Fillings?",
                answer:
                    "Glass Ionomer Cement (GIC): Affordable, fluoride-releasing, good for small fillings.\nComposite: Tooth-colored, aesthetically pleasing, ideal for visible teeth.\nMiracle Mix: Combines metal and GIC for strength in specific cases.\nMTA: Used for deep caries near the pulp to promote healing.",
            },
            {
                question: "Will a Dental Filling hurt?",
                answer:
                    "Local anesthesia prevents pain during the procedure.\nTemporary sensitivity to hot/cold may occur post-treatment.\nDiscomfort is minimal and subsides within a few days.",
            },
            {
                question: "How long does a Dental Filling take?",
                answer: "Simple fillings take 30-45 minutes.\nComplex or multiple fillings may take up to 60 minutes.",
            },
            {
                question: "Do prices vary by material used for Fillings?",
                answer:
                    "Yes, composite is pricier than GIC due to aesthetics and durability.\nMTA and miracle mix may cost more for specialized applications.\nPrices also depend on filling size (Grade 1-3) and complexity.",
            },
        ],
    },
    {
        id: 7,
        title: "Crown",
        description:
            "A cap placed over a damaged or weakened tooth to restore its shape and function. Covers the entire visible portion of the tooth. Enhances strength, appearance, and protection.",
        category: "restorative",
        price: 15000,
        duration: "120",
        image_url: "https://images.pexels.com/photos/6528907/pexels-photo-6528907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        why_use_service:
            "Protects teeth weakened by large fillings or root canal treatment.\nRestores broken or severely decayed teeth to normal function.\nImproves aesthetics for discolored or misshapen teeth.\nPrevents further damage or tooth loss.",
        what_if_not_used:
            "Weakened teeth may fracture during normal chewing.\nLarge fillings may fail, leading to further decay or infection.\nAesthetically compromised teeth can affect confidence and smile.",
        before_appointment:
            "Ensure the tooth is free of infection with a prior check-up.\nDiscuss material options with the dentist (e.g., ceramic vs. metal).\nMaintain good oral hygiene to support the procedure.",
        after_service:
            "Avoid sticky or hard foods for 24 hours to protect the cement.\nFloss carefully to avoid dislodging the crown.\nReport any looseness or discomfort to the dentist immediately.",
        is_active: true,
        faqs: [
            {
                question: "What is a Dental Crown?",
                answer:
                    "A cap placed over a damaged or weakened tooth to restore its shape and function.\nCovers the entire visible portion of the tooth.\nEnhances strength, appearance, and protection.",
            },
            {
                question: "Why is a Dental Crown necessary?",
                answer:
                    "Protects teeth weakened by large fillings or root canal treatment.\nRestores broken or severely decayed teeth to normal function.\nImproves aesthetics for discolored or misshapen teeth.\nPrevents further damage or tooth loss.",
            },
            {
                question: "How many visits are needed for a Dental Crown?",
                answer:
                    "Typically two visits: one for tooth preparation and impression, one for placement.\nTemporary crowns may be used between visits.\nAdjustments may require an additional visit.",
            },
            {
                question: "What should I do before coming for a Dental Crown?",
                answer:
                    "Ensure the tooth is free of infection with a prior check-up.\nDiscuss material options with the dentist (e.g., ceramic vs. metal).\nMaintain good oral hygiene to support the procedure.",
            },
            {
                question: "What should I do after a Dental Crown?",
                answer:
                    "Avoid sticky or hard foods for 24 hours to protect the cement.\nFloss carefully to avoid dislodging the crown.\nReport any looseness or discomfort to the dentist immediately.",
            },
            {
                question: "What materials are used for Crowns?",
                answer:
                    "Metal: Durable, cost-effective, used for back teeth, bruxism patient.\nMetal-Ceramic: Combines strength and aesthetics for visible teeth.\nAll-Ceramic (eMax): Natural-looking, ideal for front teeth.\nZirconia: High strength and aesthetics.",
            },
            {
                question: "Will getting a Dental Crown hurt?",
                answer:
                    "Local anesthesia ensures a painless procedure.\nTemporary sensitivity may occur around the gumline.\nDiscomfort from a temporary crown is minimal and temporary.",
            },
            {
                question: "How long does a Dental Crown procedure take?",
                answer: "Preparation visit takes 1-2 hours.\nPlacement visit takes about 15-30 hour.",
            },
            {
                question: "Do prices vary by material used for Crowns?",
                answer:
                    "Yes, zirconia and eMax are more expensive due to aesthetics and durability.\nMetal crowns and Porcelain fused with metal crown are the most cost-effective option.\nCosts may increase for custom designs or complex cases.",
            },
        ],
    },
    {
        id: 8,
        title: "Bridge",
        description:
            "A prosthetic device to replace one or more missing teeth. Anchored to adjacent natural teeth or implants for stability. Restores function and appearance of the smile.",
        category: "restorative",
        price: 25000,
        duration: "120",
        image_url: "https://media.istockphoto.com/id/527220256/photo/dental-health-care.jpg?s=612x612&w=0&k=20&c=jtZ57Erkby6cRLfnoNRGYcmsSjLB3ByQuugP-ftz1G8=",
        why_use_service:
            "Restores chewing and speaking ability after tooth loss.\nPrevents adjacent teeth from shifting, maintaining alignment.\nSupports facial structure to avoid sagging or changes in appearance.\nImproves aesthetics by filling gaps in the smile.",
        what_if_not_used:
            "Adjacent teeth may shift into the empty space, causing misalignment.\nDifficulty chewing and speaking properly.\nFacial support may be compromised, leading to premature aging.",
        before_appointment:
            "Ensure adjacent teeth are healthy and strong enough to support the bridge.\nDiscuss material options and expectations with the dentist.\nComplete any necessary preliminary treatments.",
        after_service:
            "Use floss threaders or interdental brushes to clean under the bridge.\nAvoid chewing hard or sticky foods initially to protect the bridge.\nSchedule regular check-ups to monitor bridge stability.",
        is_active: true,
        faqs: [
            {
                question: "What is a Dental Bridge?",
                answer:
                    "A prosthetic device to replace one or more missing teeth.\nAnchored to adjacent natural teeth or implants for stability.\nRestores function and appearance of the smile.",
            },
            {
                question: "Why is a Dental Bridge necessary?",
                answer:
                    "Restores chewing and speaking ability after tooth loss.\nPrevents adjacent teeth from shifting, maintaining alignment.\nSupports facial structure to avoid sagging or changes in appearance.\nImproves aesthetics by filling gaps in the smile.",
            },
            {
                question: "How many visits are needed for a Dental Bridge?",
                answer:
                    "Typically 2-3 visits for preparation, try-in, and fitting.\nTemporary bridges may be placed between visits.\nAdjustments may require an additional visit.",
            },
            {
                question: "What should I do after a Dental Bridge?",
                answer:
                    "Use floss threaders or interdental brushes to clean under the bridge.\nAvoid chewing hard or sticky foods initially to protect the bridge.\nSchedule regular check-ups to monitor bridge stability.",
            },
            {
                question: "What materials are used for Bridges?",
                answer:
                    "Metal: Strong, cost-effective, typically for back teeth.\nMetal-Ceramic: Balances strength and aesthetics.\nAll-Ceramic (eMax): Natural look for visible areas.\nZirconia: Premium for durability and aesthetics.",
            },
            {
                question: "Will getting a Dental Bridge hurt?",
                answer:
                    "Local anesthesia ensures no pain during preparation or placement.\nMild soreness around gums may occur temporarily.\nAdjustments are made to ensure comfort.",
            },
            {
                question: "How long does a Dental Bridge procedure take?",
                answer:
                    "Each visit takes 1 hours.\nTotal process spans 2- 3 days, depending on lab time and case complication.",
            },
            {
                question: "Do prices vary by material used for Bridges?",
                answer:
                    "Yes, zirconia are more expensive for their aesthetic appeal.\nMetal bridges are more affordable but less cosmetic.\nCosts vary based on the number of teeth replaced.",
            },
        ],
    },
    {
        id: 9,
        title: "Veneers",
        description:
            "A thin shell bonded to the front of teeth to improve appearance. Covers stains, chips, gaps, or minor misalignment. Made from composite or porcelain for a natural look.",
        category: "cosmetic",
        price: 18000,
        duration: "120",
        image_url: "https://images.pexels.com/photos/3779707/pexels-photo-3779707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        why_use_service:
            "Enhances smile aesthetics for discolored or damaged front teeth.\nCorrects minor misalignment without braces.\nBoosts confidence with a uniform, bright smile.\nOffers a durable cosmetic solution for front teeth.",
        what_if_not_used:
            "Stained or chipped front teeth can affect confidence and social interactions.\nMinor misalignment may worsen over time.\nAesthetic concerns may impact self-esteem and quality of life.",
        before_appointment:
            "Get a dental cleaning or whitening for consistent color.\nDiscuss desired shade and shape with the dentist.\nAvoid staining foods/drinks 24 hours prior.",
        after_service:
            "Avoid biting hard objects like ice or nails to prevent chipping.\nUse non-abrasive toothpaste to maintain veneer surface.\nWear a mouthguard if you grind teeth at night.",
        is_active: true,
        faqs: [
            {
                question: "What is a Veneer?",
                answer:
                    "A thin shell bonded to the front of teeth to improve appearance.\nCovers stains, chips, gaps, or minor misalignment.\nMade from composite or porcelain for a natural look.",
            },
            {
                question: "Why is a Veneer necessary?",
                answer:
                    "Enhances smile aesthetics for discolored or damaged front teeth.\nCorrects minor misalignment without braces.\nBoosts confidence with a uniform, bright smile.\nOffers a durable cosmetic solution for front teeth.",
            },
            {
                question: "How many visits are needed for Veneers?",
                answer:
                    "Typically 2-3 visits: consultation/preparation, impression, and bonding.\nTemporary veneers may be used between visits.\nAdjustments may require a follow-up.",
            },
            {
                question: "What should I do before coming for Veneers?",
                answer:
                    "Get a dental cleaning or whitening for consistent color.\nDiscuss desired shade and shape with the dentist.\nAvoid staining foods/drinks 24 hours prior.",
            },
            {
                question: "What should I do after Veneers?",
                answer:
                    "Avoid biting hard objects like ice or nails to prevent chipping.\nUse non-abrasive toothpaste to maintain veneer surface.\nWear a mouthguard if you grind teeth at night.",
            },
            {
                question: "What materials are used for Veneers?",
                answer:
                    "Direct Composite: Applied in-office, less expensive, less durable.\nPorcelain (eMax): Custom-made, natural-looking, highly durable.",
            },
            {
                question: "Will getting Veneers hurt?",
                answer:
                    "Minimal discomfort with local anesthesia during enamel preparation.\nSlight sensitivity may occur post-procedure.\nProcedure is generally well-tolerated.",
            },
            {
                question: "How long does a Veneer procedure take?",
                answer:
                    "Preparation takes 1-2 hours; bonding takes about 1 hour.\nTotal process spans 1-2 weeks due to lab fabrication.",
            },
            {
                question: "Do prices vary by material used for Veneers?",
                answer:
                    "Yes, porcelain (eMax) is more expensive than composite.\nCosts depend on the number of veneers and customization.\nPorcelain offers better longevity and aesthetics.",
            },
        ],
    },
    {
        id: 10,
        title: "Denture",
        description:
            "Removable prosthetic teeth to replace missing teeth and gums. Restores function for chewing and speaking. Improves facial appearance after tooth loss.",
        category: "prosthetics",
        price: 20000,
        duration: "180",
        image_url: "https://img.freepik.com/premium-photo/asian-senior-woman-patient-holding-teeth-denture-her-hand-chew-food_622428-9573.jpg",
        why_use_service:
            "Enables eating and speaking for those with multiple missing teeth.\nPrevents facial sagging due to tooth loss.\nEnhances aesthetics and confidence with a complete smile.\nAffordable alternative to implants for tooth replacement.",
        what_if_not_used:
            "Difficulty eating and speaking properly with missing teeth.\nFacial muscles may sag, leading to premature aging.\nSocial confidence may be affected by gaps in the smile.",
        before_appointment:
            "Ensure any extraction sites are fully healed.\nDiscuss denture type and expectations with the dentist.\nMaintain gum health with good oral hygiene.",
        after_service:
            "Clean dentures daily with a denture brush and cleaner.\nRemove at night and soak in water or denture solution.\nAdjust diet to soft foods during the initial adaptation period.",
        is_active: true,
        faqs: [
            {
                question: "What is a Denture?",
                answer:
                    "Removable prosthetic teeth to replace missing teeth and gums.\nRestores function for chewing and speaking.\nImproves facial appearance after tooth loss.",
            },
            {
                question: "Why is a Denture necessary?",
                answer:
                    "Enables eating and speaking for those with multiple missing teeth.\nPrevents facial sagging due to tooth loss.\nEnhances aesthetics and confidence with a complete smile.\nAffordable alternative to implants for tooth replacement.",
            },
            {
                question: "How many visits are needed for a Denture?",
                answer:
                    "Typically 4-5 visits for impressions, try-ins, and final fitting.\nAdjustments may require additional visits.\nProcess spans several weeks for custom fabrication.",
            },
            {
                question: "What should I do before coming for a Denture?",
                answer:
                    "Ensure any extraction sites are fully healed.\nDiscuss denture type and expectations with the dentist.\nMaintain gum health with good oral hygiene.",
            },
            {
                question: "What should I do after a Denture?",
                answer:
                    "Clean dentures daily with a denture brush and cleaner.\nRemove at night and soak in water or denture solution.\nAdjust diet to soft foods during the initial adaptation period.",
            },
            {
                question: "What types of Dentures are available?",
                answer:
                    "Complete Dentures: For fully edentulous patients (no teeth).\nRemovable Partial Dentures (RPD): For some missing teeth.\nCast Partial Dentures (CPD): Metal framework for durability.\nFlexible RPD: Comfortable, aesthetic, lightweight option.",
            },
            {
                question: "Will getting a Denture hurt?",
                answer:
                    "No pain during fitting; initial soreness as gums adjust.\nAdjustments can resolve discomfort from pressure points.\nProper care ensures a comfortable fit.",
            },
            {
                question: "How long does a Denture procedure take?",
                answer: "Each visit takes 30-60 minutes.\nTotal process spans 2 weeks for fabrication and fitting.",
            },
            {
                question: "Do prices vary by type of Denture?",
                answer:
                    "Yes, flexible and cast partial dentures are pricier than basic RPD.\nComplete dentures vary based on material quality.\nCustomization or premium materials increase costs.",
            },
        ],
    },
    {
        id: 11,
        title: "Teeth Braces",
        description:
            "Corrects misaligned teeth or jaws using braces or aligners. Improves bite, alignment, and smile aesthetics. Performed by orthodontists or trained dentists.",
        category: "orthodontics",
        price: 80000,
        duration: "30",
        image_url: "https://images.pexels.com/photos/3779708/pexels-photo-3779708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        why_use_service:
            "Improves chewing and speech by correcting bite issues.\nReduces risk of decay and wear from misaligned teeth.\nEnhances smile aesthetics, boosting self-confidence.\nPrevents jaw pain or TMJ issues from improper alignment.",
        what_if_not_used:
            "Misaligned teeth are harder to clean, increasing risk of decay and gum disease.\nBite problems can lead to jaw pain and TMJ disorders.\nAesthetic concerns may affect self-confidence and social interactions.",
        before_appointment:
            "Get a dental cleaning to remove plaque and tartar.\nAddress any cavities or gum issues before starting.\nDiscuss brace types (metal, aligners) with the dentist.",
        after_service:
            "Wear retainers as prescribed to maintain alignment.\nUse special brushes or flossers for cleaning around braces.\nAvoid hard or sticky foods to prevent damage to braces.",
        is_active: true,
        faqs: [
            {
                question: "What is Orthodontic Treatment?",
                answer:
                    "Corrects misaligned teeth or jaws using braces or aligners.\nImproves bite, alignment, and smile aesthetics.\nPerformed by orthodontists or trained dentists.",
            },
            {
                question: "Why is Orthodontic Treatment necessary?",
                answer:
                    "Improves chewing and speech by correcting bite issues.\nReduces risk of decay and wear from misaligned teeth.\nEnhances smile aesthetics, boosting self-confidence.\nPrevents jaw pain or TMJ issues from improper alignment.",
            },
            {
                question: "How many visits are needed for Orthodontic Treatment?",
                answer:
                    "Monthly adjustments over 1-2 years, depending on case severity.\nInitial consultation and final retainer fitting add visits.\nRegular check-ups ensure progress and adjustments.",
            },
            {
                question: "What should I do before coming for Orthodontic Treatment?",
                answer:
                    "Get a dental cleaning to remove plaque and tartar.\nAddress any cavities or gum issues before starting.\nDiscuss brace types (metal, aligners) with the dentist.",
            },
            {
                question: "What should I do after Orthodontic Treatment?",
                answer:
                    "Wear retainers as prescribed to maintain alignment.\nUse special brushes or flossers for cleaning around braces.\nAvoid hard or sticky foods to prevent damage to braces.",
            },
            {
                question: "What types of Braces are used?",
                answer:
                    "Traditional Metal: Cost-effective, highly effective for all cases.\nSelf-Ligating (Damon): Less friction, faster adjustments.\nClear Aligners (iAlign): Discreet, removable, for mild cases.",
            },
            {
                question: "Will Orthodontic Treatment hurt?",
                answer:
                    "Might feel Mild discomfort after adjustments.\nIf Over-the-counter pain relievers help manage soreness.\nInitial adaptation to braces may cause temporary irritation.",
            },
            {
                question: "How long does Orthodontic Treatment take?",
                answer: "Total treatment 1 - 2 years depending on complexity.\nAdjustment visits take 30minutes each.",
            },
            {
                question: "Do prices vary by type of Braces?",
                answer:
                    "Yes, clear aligners are more expensive than metal braces.\nSelf-ligating braces may cost more than traditional metal.\nCosts depend on treatment duration and case complexity.",
            },
        ],
    },
    {
        id: 12,
        title: "Dental Implants",
        description:
            "A titanium post surgically placed in the jawbone to replace a missing tooth root. Topped with a crown to restore function and appearance. Provides a permanent solution for tooth loss.",
        category: "oral surgery",
        price: 50000,
        duration: "60",
        image_url: "https://media.istockphoto.com/id/1164997027/photo/explaining-tooth-implantation.jpg?s=612x612&w=0&k=20&c=gjqAUfrbUYlSH6CxhbyxzKWQ2oh-iN5ztvSel1DQygc=",
        why_use_service:
            "Restores chewing and speaking ability for missing teeth.\nPrevents bone loss in the jaw, maintaining facial structure.\nOffers a durable, natural-looking alternative to dentures or bridges.\nEnhances confidence with a seamless smile.",
        what_if_not_used:
            "Bone loss in the jaw can occur without tooth root stimulation.\nAdjacent teeth may shift into the empty space.\nDifficulty chewing and speaking properly with missing teeth.",
        before_appointment:
            "Need to CBCT and blood test.\nUndergo bone density assessments if recommended.\nEnsure good oral hygiene and overall health.",
        after_service:
            "Eat soft foods for several weeks to avoid pressure on the implant.\nTake prescribed antibiotics to prevent infection.\nAttend follow-up visits to monitor healing and crown placement.",
        is_active: true,
        faqs: [
            {
                question: "What is a Dental Implant?",
                answer:
                    "A titanium post surgically placed in the jawbone to replace a missing tooth root.\nTopped with a crown to restore function and appearance.\nProvides a permanent solution for tooth loss.",
            },
            {
                question: "Why is a Dental Implant necessary?",
                answer:
                    "Restores chewing and speaking ability for missing teeth.\nPrevents bone loss in the jaw, maintaining facial structure.\nOffers a durable, natural-looking alternative to dentures or bridges.\nEnhances confidence with a seamless smile.",
            },
            {
                question: "How many visits are needed for a Dental Implant?",
                answer:
                    "Typically 3-6 visits over 3-6 months for surgery, healing, and crown placement.\nAdditional visits may be needed for bone grafts or assessments.\nFollow-ups ensure proper integration and function.",
            },
            {
                question: "What should I do before coming for a Dental Implant?",
                answer: "Need to CBCT and blood test.\nUndergo bone density assessments if recommended.",
            },
            {
                question: "What should I do after a Dental Implant?",
                answer:
                    "Eat soft foods for several weeks to avoid pressure on the implant.\nTake prescribed antibiotics to prevent infection.\nAttend follow-up visits to monitor healing and crown placement.",
            },
            {
                question: "What brands or types of Implants are used?",
                answer:
                    "Nobel Biocare: High-quality, reliable implant system.\nStraumann: Premium option with excellent osseointegration.\nCrowns in metal-ceramic, eMax, or zirconia for aesthetics.",
            },
            {
                question: "Will Dental Implant surgery hurt?",
                answer:
                    "Performed under local anesthesia or sedation for comfort.\nPost-operative pain is manageable with prescribed medication.\nSwelling or discomfort subsides within a few days.",
            },
            {
                question: "How long does a Dental Implant procedure take?",
                answer:
                    "Surgery takes 30min-1hr hours per implant depending upon the case complications.\nHealing period lasts 3-6 months before crown placement.",
            },
            {
                question: "Do prices vary by material or complexity for Dental Implants?",
                answer:
                    "Yes, premium brands like.Straumann are more expensive.\nDental implant pricing vary depending upon the quality and material and we have been offering best quality implants.\nZirconia or eMax crowns cost more than metal-ceramic.\nAdditional procedures like bone grafts increase costs.",
            },
        ],
    },
    {
        id: 13,
        title: "Child / Kids (Pediatric Dentistry)",
        description:
            "Specialized dental care for children from infancy to adolescence. Focuses on preventive and restorative treatments for baby and permanent teeth. Uses child-friendly techniques to create a positive experience.",
        category: "pediatric",
        price: 2000,
        duration: "30",
        image_url: "https://images.pexels.com/photos/6627347/pexels-photo-6627347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        why_use_service:
            "Promotes healthy tooth development for strong permanent teeth.\nPrevents cavities, which are common in young children.\nEstablishes good oral hygiene habits early in life.\nAddresses dental issues early to avoid complex treatments later.",
        what_if_not_used:
            "Early childhood cavities can affect permanent tooth development.\nPoor oral hygiene habits established in childhood often continue into adulthood.\nUntreated dental problems can affect eating, speaking, and self-confidence.",
        before_appointment:
            "Explain the visit to the child to reduce anxiety.\nBring comfort items like a favorite toy for young patients.\nEnsure teeth are brushed before the appointment.",
        after_service:
            "Encourage gentle brushing, especially after treatments.\nMonitor for discomfort and follow any diet restrictions.\nReinforce hygiene habits with fun brushing routines.",
        is_active: true,
        faqs: [
            {
                question: "What is Pediatric Dentistry?",
                answer:
                    "Specialized dental care for children from infancy to adolescence.\nFocuses on preventive and restorative treatments for baby and permanent teeth.\nUses child-friendly techniques to create a positive experience.",
            },
            {
                question: "Why is Pediatric Dentistry necessary?",
                answer:
                    "Promotes healthy tooth development for strong permanent teeth.\nPrevents cavities, which are common in young children.\nEstablishes good oral hygiene habits early in life.\nAddresses dental issues early to avoid complex treatments later.",
            },
            {
                question: "How many visits are needed for Pediatric Dentistry?",
                answer:
                    "Regular check-ups every 6 months for preventive care.\nTreatment-specific visits (e.g., 1 for fillings, 2 for crowns).\nFrequency depends on the child's oral health needs.",
            },
            {
                question: "What should I do before coming for Pediatric Dentistry?",
                answer:
                    "Explain the visit to the child to reduce anxiety.\nBring comfort items like a favorite toy for young patients.\nEnsure teeth are brushed before the appointment.",
            },
            {
                question: "What should I do after Pediatric Dentistry?",
                answer:
                    "Encourage gentle brushing, especially after treatments.\nMonitor for discomfort and follow any diet restrictions.\nReinforce hygiene habits with fun brushing routines.",
            },
            {
                question: "What treatments are common in Pediatric Dentistry?",
                answer:
                    "Extractions: For severely decayed or problematic baby teeth.\nFillings: To repair cavities in baby or permanent teeth.\nPulpectomy: Root canal alternative for baby teeth.\nCrowns: Metal or zirconia to restore damaged teeth.",
            },
            {
                question: "Will Pediatric Dentistry procedures hurt?",
                answer:
                    "Local anesthesia ensures minimal discomfort during procedures.\nChild-friendly explanations and techniques reduce fear.\nPost-treatment soreness is mild and temporary.",
            },
            {
                question: "How long does a Pediatric Dentistry visit take?",
                answer:
                    "Check-ups and simple treatments take 20-45 minutes.\nVisits are kept short to suit children's attention spans.",
            },
        ],
    },
    {
        id: 14,
        title: "Dental Jewelry – Diamond",
        description:
            "A small diamond or crystal bonded to the tooth surface for decoration. A non-invasive cosmetic procedure to enhance smile aesthetics. Applied using safe dental adhesive.",
        category: "cosmetic",
        price: 5000,
        duration: "10",
        image_url: "https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        why_use_service:
            "Adds a unique, sparkling touch to the smile for cosmetic appeal.\nPopular for special occasions or personal style expression.\nDoes not affect tooth function or health.\nBoosts confidence with a customized look.",
        what_if_not_used:
            "No health consequences, as this is purely cosmetic.\nMissed opportunity for unique personal expression.\nSome people prefer the distinctive look that dental jewelry provides.",
        before_appointment:
            "Brush and floss thoroughly for a clean tooth surface.\nChoose the size, shape, or type of jewelry with the dentist.\nEnsure the tooth is healthy and free of decay.",
        after_service:
            "Avoid biting hard foods to prevent dislodging the jewelry.\nClean gently around the area to maintain hygiene.\nContact the dentist if the jewelry feels loose or irritates.",
        is_active: true,
        faqs: [
            {
                question: "What is Dental Jewelry?",
                answer:
                    "A small diamond or crystal bonded to the tooth surface for decoration.\nA non-invasive cosmetic procedure to enhance smile aesthetics.\nApplied using safe dental adhesive.",
            },
            {
                question: "Why is Dental Jewelry necessary?",
                answer:
                    "Adds a unique, sparkling touch to the smile for cosmetic appeal.\nPopular for special occasions or personal style expression.\nDoes not affect tooth function or health.\nBoosts confidence with a customized look.",
            },
            {
                question: "How many visits are needed for Dental Jewelry?",
                answer:
                    "One visit for application.\nFollow-up may be needed if the jewelry detaches.\nRemoval or replacement requires a single visit.",
            },
            {
                question: "What should I do before coming for Dental Jewelry?",
                answer:
                    "Brush and floss thoroughly for a clean tooth surface.\nChoose the size, shape, or type of jewelry with the dentist.\nEnsure the tooth is healthy and free of decay.",
            },
            {
                question: "What should I do after Dental Jewelry?",
                answer:
                    "Avoid biting hard foods to prevent dislodging the jewelry.\nClean gently around the area to maintain hygiene.\nContact the dentist if the jewelry feels loose or irritates.",
            },
            {
                question: "Will applying Dental Jewelry hurt?",
                answer:
                    "Completely painless, as it's non-invasive.\nNo drilling or anesthesia is required.\nApplication is quick ,comfortable and aesthetic pleasing.",
            },
            {
                question: "How long does Dental Jewelry application take?",
                answer: "Takes 10 minutes for bonding.\nImmediate results with no recovery time.",
            },
            {
                question: "How long does Dental Jewelry last?",
                answer:
                    "Lasts 2 years to several years with proper care.\nDurability depends on oral hygiene and eating habits.\nCan be removed or replaced easily by the dentist.",
            },
        ],
    },
]

export function getServiceById(id: string): Service | undefined {
    return servicesData.find((service) => service.id === Number.parseInt(id))
}

export function getRelatedServices(currentId: string, count = 3): Service[] {
    const filtered = servicesData.filter((service) => service.id !== Number.parseInt(currentId) && service.is_active)
    const shuffled = filtered.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
}

export function getAllServices(): Service[] {
    return servicesData.filter((service) => service.is_active)
}