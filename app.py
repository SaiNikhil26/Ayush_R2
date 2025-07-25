import base64
from flask import (
    Flask,
    flash,
    jsonify,
    request,
    redirect,
    url_for,
    render_template,
    session,
)
import os
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask
from roboflow import Roboflow

# ---------------------------------------------------- Modules for Disease Prediction-----------------------------------------
# import keras
# from sklearn.preprocessing import LabelBinarizer
# from keras.models import Sequential
# from keras.layers import (
#     BatchNormalization,
#     Conv2D,
#     MaxPooling2D,
#     Activation,
#     Flatten,
#     Dropout,
#     Dense,
# )
# from keras import backend as K
# from keras.preprocessing.image import ImageDataGenerator
# from keras.optimizers import Adam
# from keras.preprocessing import image
# from keras.preprocessing.image import img_to_array
# from sklearn.preprocessing import MultiLabelBinarizer

import psycopg2  # pip install psycopg2
import psycopg2.extras
import joblib
import cv2
import re
import numpy as np
from skimage import feature
from PIL import Image
import pandas as pd
from keras.models import load_model


from scipy.spatial import distance
from skimage import feature

app = Flask(__name__)

DB_HOST = "dpg-cka4cbaa8h2s738ha7gg-a.oregon-postgres.render.com"
DB_NAME = "smartindiahackathon"
DB_USER = "nikhil"
DB_PASS = "EcgrKuOwalOpS55vOt49oEFlBy1SUfNf"
app.secret_key = "nikhil2004"

conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST)
if conn:
    print("Connection established")
else:
    print("Error")

UPLOAD_FOLDER = "static/uploads/"
TEST_FOLDER = "static/tests/"
CONTRIBUTE_FOLDER = "static/contribute/"

app.secret_key = "secret key"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["TEST_FOLDER"] = TEST_FOLDER
app.config["CONTRIBUTE_FOLDER"] = CONTRIBUTE_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 10244

ALLOWED_EXTENSIONS = set(["png", "jpg", "jpeg", "gif"])
encoder = joblib.load("encoder.joblib")
model = load_model("keras2_model (2).h5")
model_cnn = load_model("dl_model.h5")
scaler = joblib.load("scaler.joblib")
label_binarizer = joblib.load("label_binarizer (1).joblib")

rf = Roboflow(api_key="EtEtJQWEVmA0vyfOjs6B")
project = rf.workspace().project("leaf-pow3m")
model2 = project.version(1).model


@app.route("/")
def success():
    # Check if user is loggedin
    if "loggedin" in session:
        # User is loggedin show them the home page
        return render_template("index.html", username=session["username"])
    # User is not loggedin redirect to login page
    return redirect(url_for("login"))


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def class_name(val):
    classes = {
        "a1": "Land Caltrops (Bindii)",
        "a2": "Sweet Flag",
        "a3": "Common Wireweed",
        "a4": "Velvet Bean",
        "a5": "Coatbuttons",
        "a6": "Crown Flower",
        "a7": "Shaggy Button Weed",
        "a8": "Avaram",
        "a9": "Benghal Dayflower",
        "a10": "Indian CopperLeaf",
        "a11": "Mexican Mint",
        "a12": "Indian Thornapple",
        "a13": "Punarnava",
        "a14": "Ivy Gourd",
        "a15": "Mexican Prickly Poppy",
        "a16": "Tinnevelly Senna",
        "a17": "Bristly Wild Grape",
        "a18": "Square Stalked Vine",
        "a19": "Bellyache Bush (Green)",
        "a20": "Prickly Chaff Flower",
        "a21": "Malabar Catmint",
        "a22": "Indian Stinging Nettle",
        "a23": "Sweet Basil",
        "a24": "Indian Sarsaparilla",
        "a25": "Small Water Clover",
        "a26": "Madagascar Periwinkle",
        "a27": "Indian Jujube",
        "a28": "Kokilaksha",
        "a29": "Trellis Vine",
        "a30": "Rosary Pea",
        "a31": "Stinking Passionflower",
        "a32": "Heart-Leaved Moonseed",
        "a33": "Green Chireta",
        "a34": "Cape Gooseberry",
        "a35": "Big Caltrops",
        "a36": "Balloon Vine",
        "a37": "Holy Basil",
        "a38": "Black-Honey Shrub",
        "a39": "Nalta Jute",
        "a40": "Country Mallow",
        "a41": "Asthma Plant",
        "a42": "Madras Pea Pumpkin",
        "a43": "Butterfly Pea",
        "a44": "Mountain Knotgrass",
        "a45": "Purple Fruited Pea Eggplant",
        "a46": "Spiderwisp",
        "a47": "Panicled Foldwing",
        "a48": "Purple Tephrosia",
        "a49": "Night Blooming Cereus",
        "a50": "Indian Wormwood",
        "s1": "Betel Leaves",
        "s2": "Amaranthus Red",
        "s3": "Mint Leaves",
        "s4": "Chinese Spinach",
        "s5": "Lettuce Tree",
        "s6": "Palak",
        "s7": "Black Night Shade",
        "s8": "Dwarf Copperleaf (Green)",
        "s9": "Indian pennywort",
        "s10": "Fenugreek Leaves",
        "s11": "Celery",
        "s12": "Coriander Leaves",
        "s13": "Dwarf Copperleaf (Red)",
        "s14": "Balloon Vine",
        "s15": "Lagos Spinach",
        "s16": "Mustard",
        "s17": "Amaranthus Green",
        "s18": "Lambs Quarters",
        "s19": "Water Spinach",
        "s20": "Malabar Spinach (Green)",
        "s21": "Giant Pigweed",
        "s22": "Curry Leaf",
        "s23": "False Amarnath",
        "s24": "Gongura",
        "s25": "Siru Keerai",
    }
    return classes[val]


def predict(data):
    scaled_data = scaler.transform(data)
    pred = model_cnn.predict(scaled_data)
    predicted_class_index = np.argmax(pred[0])
    prediction = encoder.inverse_transform([predicted_class_index])[0]
    inter_pred = str(prediction)  # Convert the prediction to a string
    return inter_pred


def create_dataset(img_path):
    names = [
        "area",
        "perimeter",
        "physiological_length",
        "physiological_width",
        "aspect_ratio",
        "rectangularity",
        "circularity",
        "mean_r",
        "mean_g",
        "mean_b",
        "stddev_r",
        "stddev_g",
        "stddev_b",
        "contrast",
        "correlation",
        "inverse_difference_moments",
        "entropy",
    ]
    data = []
    main_img = cv2.imread(img_path)
    img = cv2.cvtColor(main_img, cv2.COLOR_BGR2RGB)
    gs = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    blur = cv2.GaussianBlur(gs, (25, 25), 0)
    ret_otsu, im_bw_otsu = cv2.threshold(
        blur, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU
    )
    kernel = np.ones((50, 50), np.uint8)
    closing = cv2.morphologyEx(im_bw_otsu, cv2.MORPH_CLOSE, kernel)

    contours, _ = cv2.findContours(closing, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    if len(contours) > 0:
        for cnt in contours:
            M = cv2.moments(cnt)
            area = cv2.contourArea(cnt)
            perimeter = cv2.arcLength(cnt, True)
            x, y, w, h = cv2.boundingRect(cnt)
            aspect_ratio = float(w) / h
            if area != 0:
                rectangularity = w * h / area
                circularity = ((perimeter) ** 2) / area
            else:
                rectangularity = 0
                circularity = 0
    else:
        rectangularity = 0
        circularity = 0

    red_channel = img[:, :, 0]
    green_channel = img[:, :, 1]
    blue_channel = img[:, :, 2]
    blue_channel[blue_channel == 255] = 0
    green_channel[green_channel == 255] = 0
    red_channel[red_channel == 255] = 0

    red_mean = np.mean(red_channel)
    green_mean = np.mean(green_channel)
    blue_mean = np.mean(blue_channel)

    red_std = np.std(red_channel)
    green_std = np.std(green_channel)
    blue_std = np.std(blue_channel)

    # Calculate LBP texture features
    lbp = feature.local_binary_pattern(gs, 8, 1, method="uniform")
    hist, _ = np.histogram(lbp.ravel(), bins=np.arange(0, 11), range=(0, 10))
    hist = hist.astype("float")
    hist /= hist.sum() + 1e-7

    vector = [
        area,
        perimeter,
        w,
        h,
        aspect_ratio,
        rectangularity,
        circularity,
        red_mean,
        green_mean,
        blue_mean,
        red_std,
        green_std,
        blue_std,
        hist[0],
        hist[1],
        hist[2],
        hist[3],
    ]

    data.append(vector)

    df = pd.DataFrame(data, columns=names)
    return df


default_image_size = tuple((256, 256))


def load_and_predict(image_path):
    try:
        # Load and preprocess the image
        image = Image.open(image_path)
        image = image.resize(default_image_size)  # Resize the image
        image_array = np.asarray(image)
        image_array = image_array.reshape(1, 256, 256, 3)
        #         print(image)

        #         # Make predictions
        predictions = model.predict(image_array)

        #         # Get the predicted class
        predicted_class = label_binarizer.classes_[np.argmax(predictions)]

        #         # Print the predicted class
        print(f"Predicted class: {predicted_class}")
        return predicted_class

    except Exception as e:
        print(f"Error: {e}")


@app.route("/landing")
def land():
    return render_template("index.html")


@app.route("/tryus")
def tryus():
    return render_template("tryus.html")


@app.route("/greencheck")
def greencheck():
    return render_template("greencheck.html")


@app.route("/pharma")
def pharma():
    return render_template("pharma.html")


@app.route("/map")
def map_show():
    return render_template("test.html")


@app.route("/contribute")
def contribute():
    return render_template("contribute.html")


@app.route("/shopleaf")
def shopleaf():
    return render_template("ecom.html")


@app.route("/mapsearch")
def mapsearch():
    return render_template("mapSearch.html")


@app.route("/disease-prediction")
def disease():
    return render_template("disease.html")


@app.route("/prediction", methods=["POST"])
def prediction():
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    directory_path = "static/uploads/"

    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    if "file" not in request.files:
        flash("No file part")
        return redirect(request.url)
    file = request.files["file"]
    if file.filename == "":
        flash("No image selected for uploading")
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)

        # ------------------------------------------------ Prediction ------------------------------------------------------------------------
        numerical_data = create_dataset(filepath)
        pred = predict(numerical_data)
        prediction = class_name(pred)
        # pred = model2.predict(filepath, confidence=0, overlap=30).json()
        # print(pred)
        # prediction = pred['predictions'][0]['class'].rstrip()

        # --------------------------------------------- Querying History-------------------------------------------------------------------------------
        cursor.execute(
            """INSERT INTO history(plant_class) VALUES (%s)""", (prediction,)
        )
        conn.commit()

        # ---------------------------------------------- Details of the plant/herb --------------------------------------------------------------------

        cursor.execute(
            """SELECT scientific_name FROM details WHERE plant_name LIKE %s""",
            ("%" + prediction + "%",),
        )
        scientific = cursor.fetchone()
        if scientific:
            scientific_name = scientific[0]
        else:
            scientific_name = "Scientific Name not found"
        cursor.execute(
            """SELECT advantage FROM details WHERE plant_name LIKE %s""",
            ("%" + prediction + "%",),
        )
        advantage_result = cursor.fetchone()
        if advantage_result:
            advantage = advantage_result[0]
        else:
            advantage = "Advantages not found"
        cursor.execute(
            """SELECT general_location FROM details WHERE plant_name LIKE %s""",
            ("%" + prediction + "%",),
        )
        location = cursor.fetchone()
        if location:
            general_location = location[0]
        else:
            general_location = "Locations not found"
        cursor.execute(
            """SELECT web_link FROM details WHERE plant_name LIKE %s""",
            ("%" + prediction + "%",),
        )
        web = cursor.fetchone()
        if web:
            web_link = web[0]
        else:
            web_link = "Link not available"

        # conn.commit()
        flash("Image successfully uploaded and displayed")
        print(prediction)
        return render_template(
            "tryus.html",
            src=1,
            filename=filename,
            plant_name=prediction,
            scientific_name=scientific_name,
            advantages=advantage,
            general_location=general_location,
            web_link=web_link,
        )  # Pass prediction to the template
    else:
        flash("Allowed image types are - png, jpg, jpeg, gif")
        return redirect(request.url)


@app.route("/capture", methods=["POST"])
def capture():
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    try:
        data = request.json
        image_data_url = data.get("imageDataURL")

        # Decode the Base64 image data
        image_data = base64.b64decode(image_data_url.split(",")[1])

        # Define the file path where you want to save the image
        file_name = "captured_image.png"  # You can specify the desired file format

        # Save the image data as a file in the static folder
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], file_name)
        # file.save(file_path)
        with open(file_path, "wb") as f:
            f.write(image_data)
        # ------------------------------------------------ Prediction ------------------------------------------------------------------------
        # numerical_data = create_dataset(file_path)
        print("HI start")
        pred = model2.predict(file_path, confidence=0, overlap=0).json()
        print(pred)
        prediction = pred["predictions"][0]["class"].rstrip()
        print(prediction)
        print("HI end")
        # prediction = class_name(pred)

        # --------------------------------------------- Querying History-------------------------------------------------------------------------------
        cursor.execute(
            """INSERT INTO history(plant_class) VALUES (%s)""", (prediction,)
        )
        conn.commit()

        # ---------------------------------------------- Details of the plant/herb --------------------------------------------------------------------

        cursor.execute(
            """SELECT scientific_name FROM details WHERE plant_name LIKE %s""",
            ("%" + prediction + "%",),
        )
        scientific = cursor.fetchone()
        if scientific:
            scientific_name = scientific[0]
        else:
            scientific_name = "Scientific Name not found"
        cursor.execute(
            """SELECT advantage FROM details WHERE plant_name LIKE %s""",
            ("%" + prediction + "%",),
        )
        advantage_result = cursor.fetchone()
        if advantage_result:
            advantage = advantage_result[0]
        else:
            advantage = "Advantages not found"
        cursor.execute(
            """SELECT general_location FROM details WHERE plant_name LIKE %s""",
            ("%" + prediction + "%",),
        )
        location = cursor.fetchone()
        if location:
            general_location = location[0]
        else:
            general_location = "Locations not found"
        cursor.execute(
            """SELECT web_link FROM details WHERE plant_name LIKE %s""",
            ("%" + prediction + "%",),
        )
        web = cursor.fetchone()
        if web:
            web_link = web[0]
        else:
            web_link = "Link not available"

        conn.commit()
        flash("Image successfully uploaded and displayed")
        image_info = {
            "plant_name": prediction,
            "scientific_name": scientific_name,
            "advantages": advantage,
            "general_location": general_location,
            "web_link": web_link,
        }
        return jsonify(image_info)
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/green_check", methods=["POST"])
def green_check():
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    if "file" not in request.files:
        flash("No file part")
        return redirect(request.url)
    file = request.files["file"]
    if file.filename == "":
        flash("No image selected for uploading")
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config["TEST_FOLDER"], filename)
        file.save(filepath)

        # ------------------------------------------------ Prediction ------------------------------------------------------------------------
        numerical_data = create_dataset(filepath)
        pred = predict(numerical_data)
        prediction = class_name(pred)

        # ----------------------------------------------- Authenticity ------------------------------------------------------------------------
        print(pred)
        cursor.execute(
            """SELECT area, perimeter, physiological_length, physiological_width, aspect_ratio,
                  rectangularity, circularity, mean_r, mean_g, mean_b, stddev_r, stddev_g, stddev_b,
                  contrast, correlation, inverse_difference_moments, entropy 
                  FROM plant_data WHERE plant_number LIKE %s""",
            (pred,),
        )
        matching_rows = cursor.fetchall()

        if not matching_rows:
            print("No matching data found in the database")
        else:
            similarities = []  # List to store similarities for all matching rows

        # Convert the matching rows to NumPy arrays for efficient calculation
        reference_values = np.array([list(map(float, row)) for row in matching_rows])

        # Assuming 'numerical_data' is a Pandas DataFrame with your predicted data
        predicted_values = np.array(numerical_data.values).flatten()

        for ref_row in reference_values:
            # Calculate the Euclidean distance between the feature vectors
            euclidean_distance = distance.euclidean(ref_row, predicted_values)

            # Calculate similarity (assuming smaller Euclidean distance implies higher similarity)
            max_distance = np.sqrt(
                sum(x**2 for x in ref_row)
            )  # Maximum possible Euclidean distance
            similarity = 1 - (euclidean_distance / max_distance)

            similarities.append(similarity)

        # Calculate and print the median similarity
        authencity_val = np.median(similarities) * 100

        if authencity_val > 60:
            authenticity = True
            auth_statement = "Yes, this is an original leaf"
        else:
            authenticity = False
            auth_statement = "No, this is not an original leaf"
        cursor.execute(
            """INSERT INTO authentic(plant_class, auth_value, authenticity) VALUES (%s, %s, %s)""",
            (prediction, authencity_val, authenticity),
        )
        conn.commit()
        os.remove(filepath)
        return render_template(
            "greencheck.html", authenticity=auth_statement, filename=filename
        )
    else:
        flash("Allowed image types are - png, jpg, jpeg, gif")
        return redirect(request.url)


@app.route("/contribute", methods=["POST"])
def upload_file():
    # Check if a file is included in the request
    if "file" not in request.files:
        return jsonify({"message": "No file part"}), 400

    file = request.files["file"]

    # Check if the file is empty
    if file.filename == "":
        return jsonify({"message": "No selected file"}), 400

    # Check if the file has a valid file extension (e.g., restrict to images)
    allowed_extensions = {"jpg", "jpeg", "png", "gif"}
    if (
        "." not in file.filename
        or file.filename.split(".")[-1].lower() not in allowed_extensions
    ):
        return jsonify({"message": "Invalid file extension"}), 400

    # Save the file to the specified folder
    file.save(os.path.join(app.config["CONTRIBUTE_FOLDER"], file.filename))

    return jsonify({"message": "File uploaded and saved successfully"}), 200


@app.route("/login", methods=["GET", "POST"])
def login():
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    # Check if "username" and "password" POST requests exist (user submitted form)
    if (
        request.method == "POST"
        and "username" in request.form
        and "password" in request.form
    ):
        username = request.form["username"]
        password = request.form["password"]
        print(password)

        # Check if account exists using MySQL
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        # Fetch one record and return result
        account = cursor.fetchone()

        if account:
            password_rs = account["password"]
            print(password_rs)
            # If account exists in users table in out database
            if check_password_hash(password_rs, password):
                # Create session data, we can access this data in other routes
                session["loggedin"] = True
                session["id"] = account["id"]
                session["username"] = account["username"]
                # Redirect to home page
                return render_template("index.html")
            else:
                # Account doesnt exist or username/password incorrect
                flash("Account doesn't exist")
        else:
            # Account doesnt exist or username/password incorrect
            flash("Incorrect username/password")

    return render_template("login.html")


@app.route("/signup", methods=["GET", "POST"])
def signup():
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    # Check if "username", "password", "email", and "fullname" POST requests exist (user submitted form)
    if (
        request.method == "POST"
        and "username" in request.form
        and "password" in request.form
        and "email" in request.form
    ):
        # Create variables for easy access
        username = request.form["username"]
        password = request.form["password"]
        email = request.form["email"]

        _hashed_password = generate_password_hash(password)

        # Check if account exists using MySQL
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        account = cursor.fetchone()

        # If account exists, show error and validation checks
        if account:
            flash("Account already exists!")
        elif not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            flash("Invalid email address!")
        elif not re.match(r"[A-Za-z0-9]+", username):
            flash("Username must contain only characters and numbers!")
        elif not username or not password or not email:
            flash("Please fill out the form!")
        else:
            cursor.execute(
                "INSERT INTO users (username, password, email) VALUES (%s, %s, %s)",
                (username, _hashed_password, email),
            )
            cursor.close()
            flash("Successfully registered")

    elif request.method == "POST":
        # Form is empty (no POST data)
        flash("Please fill out the form!")

    conn.commit()

    # Show registration form with message (if any)
    return render_template("signup.html")


@app.route("/logout")
def logout():
    # Remove session data, this will log the user out
    session.pop("loggedin", None)
    session.pop("id", None)
    session.pop("username", None)
    # Redirect to login page
    return redirect(url_for("login"))


@app.route("/userdetails")
def userdetails():
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    if "loggedin" in session:
        username = session.get("username")
        cursor.execute("SELECT email FROM users WHERE username = %s", (username,))
        email = cursor.fetchone()[0]

        return render_template("ecom.html", username=username, email=email, auth=1)


@app.route("/disease-prediction", methods=["POST"])
def dis():
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    if "file" not in request.files:
        flash("No file part")
        return redirect(request.url)
    file = request.files["file"]
    if file.filename == "":
        flash("No image selected for uploading")
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config["TEST_FOLDER"], filename)
        file.save(filepath)
        disease_pred = load_and_predict(filepath)
        prediction = re.sub("_+", " ", disease_pred)

        print(prediction)
        cursor.execute(
            """SELECT cure_disease FROM disease WHERE "Plant disease" LIKE %s""",
            ("%" + disease_pred + "%",),
        )
        cure = cursor.fetchone()[0]

        return render_template(
            "disease.html", disease=prediction, src=1, cure=cure, filename=filename
        )


if __name__ == "main":
    app.run(debug=True)
