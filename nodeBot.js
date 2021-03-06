(fs = require("fs")),
  (path = require("path")),
  (Twit = require("twit")),
  (config = require(path.join(__dirname, "config.js")));
const dotenv = require("dotenv").config();

const Victoriano = new Twit(config);


// Victoriano.post(
//   "statuses/update",
//   { status: "Hola, esto es un bot que recopila imagenes históricas de la publicidad y la ilustración a lo largo de la historia panameña!" },
//   function (err, data, response) {
//     console.log(data);
//   }
// );

//   Pick image from array
const randomImageSelector = (images) => {
  return images[Math.floor(Math.random() * images.length)];
};

// Pick image and Tweet:
const tweetRandomImage = async () => {
  fs.readdir(__dirname + "/images", (err, files) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      let images = [];
      files.forEach((f) => {
        images.push(f);
      });
      const imagePath = path.join(
          __dirname,
          "/images/" + randomImageSelector(images)
        ),
        b64content = fs.readFileSync(imagePath, { encoding: "base64" });
      console.log("uploading an image...");
      corte = imagePath.split(
        "/home/ericlucero/Dropbox/Python_things/Twitter/images/"
      );
      year = corte[1].slice(0, 4);
      description = corte[1].slice(5, -3);
// fifafofo2233*#
      Victoriano.post(
        "media/upload",
        { media_data: b64content },
        function (err, data, response) {
          if (err) {
            console.log("error:", err);
          } else {
            const image = data;
            console.log("image uploaded, adding description...");
            console.log(image);
            console.log(`(${year}) ${description}`);
            Victoriano.post(
              "media/metadata/create",
              {
                media_id: image.media_id_string,
                alt_text: {
                  text: "Describe the image",
                },
              },
              function (err, data, response) {
                console.log("tweeting the image...");

                Victoriano.post(
                  "statuses/update",
                  {
                    status: `(${year}) ${description}`,
                    media_ids: [image.media_id_string],
                  },
                  function (err, data, response) {
                    if (err) {
                      console.log("error:", err);
                    } else {
                      console.log("posted an image!");
                    }
                  }
                );
              }
            );
          }
        }
      );
      fs.unlink(imagePath, function (err) {
        if (err) {
          console.log("error: unable to delete image " + imagePath);
        } else {
          console.log("image " + imagePath + " was deleted");
        }
      });
    }
  });
};

tweetRandomImage();

console.log("Hello Twitter");
