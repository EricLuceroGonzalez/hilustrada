const tweetImage = async (Victoriano,name) => {
  fs.readdir(__dirname + "/images", (err, files) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      let images = [];
      files.forEach((f) => {
        images.push(f);
      });
      const imagePath = path.join(__dirname, "/images/" + name),
        b64content = fs.readFileSync(imagePath, { encoding: "base64" });
      console.log("uploading an image...");
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
            Victoriano.post(
              "media/metadata/create",
              {
                media_id: image.media_id_string,
                alt_text: {
                    text: `Itinerario del ferrocarril de Panamá, de domingo 27 de Abril de 1890.`,
                //   text: `(${year}) ${description}`,
                },
              },
              function (err, data, response) {
                console.log("tweeting the image...");

                Victoriano.post(
                  "statuses/update",
                  {
                    status:
                      `¡Hola!, soy un bot que recopila imagenes históricas de la publicidad y la ilustración a lo largo de la historia panameña.\n
                      Itinerario del ferrocarril de Panamá, de domingo 27 de Abril de 1890.🚂🚃🚃`,
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
  return ''
};

exports.tweetImage = tweetImage;
