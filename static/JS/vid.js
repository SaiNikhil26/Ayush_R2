// Sample data for leaves and their properties
// script.js
document.addEventListener("DOMContentLoaded", function () {
    const leafContainer = document.querySelector(".products-container");
    const leafPopup = document.getElementById("leafPopup");
    const closePopup = document.getElementById("closePopup");
    const diseaseFilter = document.getElementById("diseaseFilter");
  const leaves = [
    { name: "Neem", disease: "Fever", form: "Powder",description:"\n1.Dry the leaves in the sun, in an oven, or in a dehydrator.\n2.Grind the leaves in a coffee grinder or a blender.\n3.Store the Powder in an airtight container in a cool, dark place." },
    { name: "Tulsi", disease: "Fever", form: "Drink",description: "\n1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed."},
    { name: "Mint", disease: "Headache", form: "Drink", description: "\n1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    {name: "Ginger",disease: "Fever",form: "Paste", description:"\n1. Chop the leaves into small pieces.\n2. Place the chopped leaves in a cup or teapot.\n3. Add hot water and let steep for 5-10 minutes.\n4. Strain the tea and Drink it as directed."},
    { name: "Eucalyptus", disease: "Cough", form: "Drink", description: "\n1.Wash the leaves.\n2.Chop the leaves. \n3.Juice the leaves. You can use a Juicer or a blender to Juice the leaves. " },
    { name: "Amaranthus Green", disease: "Constipation", form: "Juice",description: "\n1.Wash the leaves.\n2.Chop the leaves. \n3.Juice the leaves. You can use a Juicer or a blender to Juice the leaves. " },
    { name: "Amaranthus Red", disease: "anemia", form: "Juice",  description: "\n1.Wash the leaves.\n2.Chop the leaves. \n3.Juice the leaves. You can use a Juicer or a blender to Juice the leaves. " },
    { name: "Balloon vine", disease: "kidney stones", form: "tea", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Betel Leaves", disease: "indigestion", form: "Paste", description: "Chew 1-2 betel leaves after meals." },
    { name: "Black Night Shade", disease: "diabetes", form: "Powder", description: "1.Dry the leaves in the sun, in an oven, or in a dehydrator.\n2.Grind the leaves in a coffee grinder or a blender.\n3.Store the Powder in an airtight container in a cool, dark place." },
    { name: "Celery", disease: "high blood pressure", form: "Juice", description: "\n1.Wash the leaves.\n2.Chop the leaves. \n3.Juice the leaves. You can use a Juicer or a blender to Juice the leaves. ." },
    { name: "Chinese Spinach", disease: "Constipation", form: "Juice", description: "\n1.Wash the leaves.\n2.Chop the leaves. \n3.Juice the leaves. You can use a Juicer or a blender to Juice the leaves. " },
    { name: "Coriander Leaves", disease: "stomach problems", form: "tea", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Curry Leaf", disease: "diabetes", form: "Powder",  description: "1.Dry the leaves in the sun, in an oven, or in a dehydrator.\n2.Grind the leaves in a coffee grinder or a blender.\n3.Store the Powder in an airtight container in a cool, dark place." },
    { name: "Dwarf Copperleaf (Green)", disease: "anemia", form: "Juice", description: "\n1.Wash the leaves.\n2.Chop the leaves. \n3.Juice the leaves. You can use a Juicer or a blender to Juice the leaves. " },
    { name: "Dwarf Copperleaf (Red)", disease: "kidney stones", form: "tea",  description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "False Amarnath", disease: "pain", form: "Paste", description: "1.Crush the leaves into a fine Powder.\n2.Add a small amount of water or oil to the Powder to form a Paste.\n3.Apply the Paste to the affected area as directed." },
    { name: "Fenugreek Leaves", disease: "Constipation", form: "Juice", description: "\n1.Wash the leaves.\n2.Chop the leaves. \n3.Juice the leaves. You can use a Juicer or a blender to Juice the leaves. " },
    { name: "Giant Pigweed", disease: "skin infections", form: "Paste", description: "1.Crush the leaves into a fine Powder.\n2.Add a small amount of water or oil to the Powder to form a Paste.\n3.Apply the Paste to the affected area as directed." },
    { name: "Gongura", disease: "anemia", form: "Juice", description: "\n1.Wash the leaves.\n2.Chop the leaves. \n3.Juice the leaves. You can use a Juicer or a blender to Juice the leaves. " },
    { name: "Indian Pennywort", disease: "memory loss", form: "tea", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Lagos Spinach", disease: "Constipation", form: "Juice", escription: "\n1.Wash the leaves.\n2.Chop the leaves. \n3.Juice the leaves. You can use a Juicer or a blender to Juice the leaves. " },
    { name: "Lambs Quarters", disease: "wounds", form: "Paste", description: "1.Crush the leaves into a fine Powder.\n2.Add a small amount of water or oil to the Powder to form a Paste.\n3.Apply the Paste to the affected area as directed." },
    { name: "Lettuce Tree", disease: "diabetes", form: "Powder", description: "1.Dry the leaves in the sun, in an oven, or in a dehydrator.\n2.Grind the leaves in a coffee grinder or a blender.\n3.Store the Powder in an airtight container in a cool, dark place." },   // Add more plant leaves data as needed
    { name: "Malabar Spinach (Green)", disease: "Constipation", form: "Juice", description: "\n1.Wash the leaves.\n2.Chop the leaves. \n3.Juice the leaves. You can use a Juicer or a blender to Juice the leaves. " },
    { name: "Mint Leaves", disease: "stomach problems", form: "tea", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Mustard", disease: "cholesterol", form: "Juice", description: "\n1.Wash the leaves.\n2.Chop the leaves. \n3.Juice the leaves. You can use a Juicer or a blender to Juice the leaves. " },
    { name: "Palak", disease: "Constipation", form: "Juice", description: "\n1.Wash the leaves.\n2.Chop the leaves. \n3.Juice the leaves. You can use a Juicer or a blender to Juice the leaves. " },
    { name: "Siru Keerai", disease: "diabetes", form: "Powder", description: "T1.Dry the leaves in the sun, in an oven, or in a dehydrator.\n2.Grind the leaves in a coffee grinder or a blender.\n3.Store the Powder in an airtight container in a cool, dark place." },
    { name: "Water Spinach", disease: "Constipation", form: "Juice",  description: "\n1.Wash the leaves.\n2.Chop the leaves. \n3.Juice the leaves. You can use a Juicer or a blender to Juice the leaves. " },
    { name: "Asthma Plant", disease: "asthma", form: "tea", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Avaram", disease: "diabetes", form: "Powder", description: "1.Dry the leaves in the sun, in an oven, or in a dehydrator.\n2.Grind the leaves in a coffee grinder or a blender.\n3.Store the Powder in an airtight container in a cool, dark place." },
    { name: "Balloon Vine", disease: "kidney stones", form: "tea", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Benghal Dayflower", disease: "skin infections", form: "Paste", description: "1.Crush the leaves into a fine Powder.\n2.Add a small amount of water or oil to the Powder to form a Paste.\n3.Apply the Paste to the affected area as directed." },
    { name: "Big Caltrops", disease: "wounds", form: "Paste", description: "1.Crush the leaves into a fine Powder.\n2.Add a small amount of water or oil to the Powder to form a Paste.\n3.Apply the Paste to the affected area as directed." },
    { name: "Black-Honey Shrub", disease: "liver problems", form: "tea",  description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Bristly Wild Grape", disease: "Cough and cold", form: "tea",description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Butterfly Pea", disease: "anxiety and depression", form: "tea", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Cape Gooseberry", disease: "Fever", form: "tea",  description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Common Wireweed", disease: "kidney problems", form: "tea", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Country Mallow", disease: "inflammation", form: "Paste", description: "1.Crush the leaves into a fine Powder.\n2.Add a small amount of water or oil to the Powder to form a Paste.\n3.Apply the Paste to the affected area as directed." },
    { name: "Crown Flower", disease: "skin infections", form: "Paste", description: "1.Crush the leaves into a fine Powder.\n2.Add a small amount of water or oil to the Powder to form a Paste.\n3.Apply the Paste to the affected area as directed." },
    { name: "Green Chireta", disease: "Fever", form: "tea", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Holy Basil", disease: "Cough and cold", form: "tea", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Indian CopperLeaf", disease: "diarrhea", form: "Paste", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Indian Jujube", disease: "diabetes", form: "Powder", description: "1.Dry the leaves in the sun, in an oven, or in a dehydrator.\n2.Grind the leaves in a coffee grinder or a blender.\n3.Store the Powder in an airtight container in a cool, dark place." },
    { name: "Indian Sarsaparilla", disease: "arthritis", form: "tea", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Indian Stinging Nettle", disease: "pain", form: "Paste",  description: "1.Crush the leaves into a fine Powder.\n2.Add a small amount of water or oil to the Powder to form a Paste.\n3.Apply the Paste to the affected area as directed." },
    { name: "Indian Thornapple", disease: "asthma", form: "tea", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Indian Wormwood", disease: "stomach problems", form: "tea",  description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Ivy Gourd", disease: "Constipation", form: "Juice", description: "\n1.Wash the leaves.\n2.Chop the leaves. \n3.Juice the leaves. You can use a Juicer or a blender to Juice the leaves. " },
    { name: "Kokilaksha", disease: "eye problems", form: "Paste",  description: "1.Crush the leaves into a fine Powder.\n2.Add a small amount of water or oil to the Powder to form a Paste.\n3.Apply the Paste to the affected area as directed.." },
    { name: "Land Caltrops (Bindii)", disease: "wounds", form: "Paste", image: "land_caltrops.jpg", description: "1.Crush the leaves into a fine Powder.\n2.Add a small amount of water or oil to the Powder to form a Paste.\n3.Apply the Paste to the affected area as directed." },
    { name: "Madagascar Periwinkle", disease: "cancer", form: "Powder", image: "madagascar_periwinkle.jpg", description: "1.Dry the leaves in the sun, in an oven, or in a dehydrator.\n2.Grind the leaves in a coffee grinder or a blender.\n3.Store the Powder in an airtight container in a cool, dark place." },
    { name: "Madras Pea Pumpkin", disease: "kidney stones", form: "tea", image: "madras_pea_pumpkin.jpg", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Malabar Catmint", disease: "pain", form: "Paste", image: "malabar_catmint.jpg", description: "1.Crush the leaves into a fine Powder.\n2.Add a small amount of water or oil to the Powder to form a Paste.\n3.Apply the Paste to the affected area as directed." },
    { name: "Mexican Mint", disease: "stomach problems", form: "tea", image: "mexican_mint.jpg", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Mexican Prickly Poppy", disease: "pain", form: "Paste", image: "mexican_prickly_poppy.jpg", description: "1.Crush the leaves into a fine Powder.\n2.Add a small amount of water or oil to the Powder to form a Paste.\n3.Apply the Paste to the affected area as directed." },
    { name: "Mountain Knotgrass", disease: "diarrhea", form: "Paste", image: "mountain_knotgrass.jpg", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Nalta Jute", disease: "kidney stones", form: "tea", image: "nalta_jute.jpg", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Night Blooming Cereus", disease: "diabetes", form: "Powder", image: "night_blooming_cereus.jpg", description: "1.Dry the leaves in the sun, in an oven, or in a dehydrator.\n2.Grind the leaves in a coffee grinder or a blender.\n3.Store the Powder in an airtight container in a cool, dark place." },
    { name: "Panicled Foldwing", disease: "wounds", form: "Paste", image: "panicled_foldwing.jpg", description: "1.Crush the leaves into a fine Powder.\n2.Add a small amount of water or oil to the Powder to form a Paste.\n3.Apply the Paste to the affected area as directed." },
    { name: "Prickly Chaff Flower", disease: "skin infections", form: "Paste", image: "prickly_chaff_flower.jpg", description: "1.Crush the leaves into a fine Powder.\n2.Add a small amount of water or oil to the Powder to form a Paste.\n3.Apply the Paste to the affected area as directed." },
    { name: "Punarnava", disease: "kidney problems", form: "tea", image: "punarnava.jpg", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Purple Fruited Pea Eggplant", disease: "cholesterol", form: "Juice", image: "purple_fruited_pea_eggplant.jpg", description: "\n1.Wash the leaves.\n2.Chop the leaves. \n3.Juice the leaves. You can use a Juicer or a blender to Juice the leaves. ." },
    { name: "Purple Tephrosia", disease: "skin infections", form: "Paste", image: "purple_tephrosia.jpg", description: "1.Crush the leaves into a fine Powder.\n2.Add a small amount of water or oil to the Powder to form a Paste.\n3.Apply the Paste to the affected area as directed." },
    { name: "Rosary Pea", disease: "stomach problems", form: "tea", image: "rosary_pea.jpg", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Shaggy Button Weed", disease: "Cough and cold", form: "tea", image: "shaggy_button_weed.jpg", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Small Water Clover", disease: "kidney stones", form: "tea", image: "small_water_clover.jpg", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Spiderwisp", disease: "wounds", form: "Paste", image: "spiderwisp.jpg", description: "1.Crush the leaves into a fine Powder.\n2.Add a small amount of water or oil to the Powder to form a Paste.\n3.Apply the Paste to the affected area as directed." },
    { name: "Square Stalked Vine", disease: "pain", form: "Paste", image: "square_stalked_vine.jpg", description: "1.Crush the leaves into a fine Powder.\n2.Add a small amount of water or oil to the Powder to form a Paste.\n3.Apply the Paste to the affected area as directed." },
    { name: "Stinking Passionflower", disease: "asthma", form: "tea", image: "stinking_passionflower.jpg", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Sweet Basil", disease: "stomach problems", form: "tea", image: "sweet_basil.jpg", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Sweet Flag", disease: "Cough and cold", form: "tea", image: "sweet_flag.jpg", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Tinnevelly Senna", disease: "Constipation", form: "Juice", image: "tinnevelly_senna.jpg", description: "\n1.Wash the leaves.\n2.Chop the leaves. \n3.Juice the leaves. You can use a Juicer or a blender to Juice the leaves. " },
    { name: "Trellis Vine", disease: "pain", form: "Paste", image: "trellis_vine.jpg", description: "1.Crush the leaves into a fine Powder.\n2.Add a small amount of water or oil to the Powder to form a Paste.\n3.Apply the Paste to the affected area as directed." },
    { name: "Velvet Bean", disease: "stomach problems", form: "tea", image: "velvet_bean.jpg", description: "1.Chop the leaves into small pieces.\n2.Place the chopped leaves in a cup or teapot.\n3.Add hot water and let steep for 5-10 minutes.\n4.Strain the tea and Drink it as directed." },
    { name: "Coatbuttons", disease: "wounds", form: "Paste", image: "coatbuttons.jpg", description: "1.Crush the leaves into a fine Powder.\n2.Add a small amount of water or oil to the Powder to form a Paste.\n3.Apply the Paste to the affected area as directed." },
    { name: "Heart-Leaved Moonseed", disease: "pain", form: "Paste", image: "heart-leaved_moonseed.jpg", description: "1.Crush the leaves into a fine Powder.\n2.Add a small amount of water or oil to the Powder to form a Paste.\n3.Apply the Paste to the affected area as directed." }
  ];
  function displayLeaves(selectedDisease) {
    leafContainer.innerHTML = "";

    leaves.forEach((leaf, index) => {
        if (selectedDisease === "all" || leaf.disease.toLowerCase() === selectedDisease.toLowerCase()) {
            const leafCard = document.createElement("div");
            leafCard.classList.add("product");

            // Add dataset attributes to store leaf information
            leafCard.dataset.form = leaf.form;
            leafCard.dataset.disease = leaf.disease;
            leafCard.dataset.description = leaf.description;

            const leafName = document.createElement("h3");
            leafName.textContent = leaf.name;

            leafCard.appendChild(leafName);

            leafCard.addEventListener('click', () => showLeafPopup(leaf));

            leafContainer.appendChild(leafCard);
        }
    });
}

function showLeafPopup(leaf) {
    const leafNameElement = document.getElementById("leafName");
    const leafFormElement = document.getElementById("leafForm");
    const leafDiseaseElement = document.getElementById("leafDisease");
    const leafDescriptionElement = document.getElementById("leafDescription");

    const description = leaf.dataset.description.split('\n'); // Split description by newlines

    // Set the popup content
    leafNameElement.textContent = leaf.querySelector("h3").textContent;
    leafFormElement.textContent = "Form: " + leaf.dataset.form;
    leafDiseaseElement.textContent = "Disease: " + leaf.dataset.disease;

    // Create separate <p> elements for each paragraph in the description
    leafDescriptionElement.innerHTML = "";
    description.forEach((paragraph) => {
        if (paragraph.trim() !== "") {
            const pElement = document.createElement("p");
            pElement.textContent = paragraph;
            leafDescriptionElement.appendChild(pElement);
        }
    });

    leafPopup.style.display = "flex";
}

leafContainer.addEventListener("click", function (e) {
    const clickedLeaf = e.target.closest(".product");
    if (clickedLeaf) {
        showLeafPopup(clickedLeaf);
    }
});

closePopup.addEventListener("click", function () {
    leafPopup.style.display = "none";
});

diseaseFilter.addEventListener("change", function () {
    const selectedDisease = diseaseFilter.value;
    displayLeaves(selectedDisease);
});

displayLeaves("all");
});