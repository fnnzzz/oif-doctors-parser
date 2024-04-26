const fs = require('fs');
const path = require('path');

const jsonFiles = fs.readdirSync('./jsons').filter(file => path.extname(file) === '.json');
const data = jsonFiles.map(file => require(`./jsons/${file}`)).flat();

const cityToStateMap = {
    "Wien": "Wien",
    "Graz": "Steiermark",
    "Linz": "Oberösterreich",
    "Salzburg": "Salzburg",
    "Innsbruck": "Tirol",
    "Klagenfurt": "Kärnten",
    "Villach": "Kärnten",
    "Wels": "Oberösterreich",
    "St. Pölten": "Niederösterreich",
    "Dornbirn": "Vorarlberg",
    "Wiener Neustadt": "Niederösterreich",
    "Steyr": "Oberösterreich",
    "Feldkirch": "Vorarlberg",
    "Bregenz": "Vorarlberg",
    "Leonding": "Oberösterreich",
    "Klosterneuburg": "Niederösterreich",
    "Baden": "Niederösterreich",
    "Wolfsberg": "Kärnten",
    "Leoben": "Steiermark",
    "Krems": "Niederösterreich",
    "Traun": "Oberösterreich",
    "Amstetten": "Niederösterreich",
    "Lustenau": "Vorarlberg",
    "Kapfenberg": "Steiermark",
    "Mödling": "Niederösterreich",
    "Hallein": "Salzburg",
    "Kufstein": "Tirol",
    "Traiskirchen": "Niederösterreich",
    "Schwechat": "Niederösterreich",
    "Braunau am Inn": "Oberösterreich",
    "Stockerau": "Niederösterreich",
    "Saalfelden": "Salzburg",
    "Ansfelden": "Oberösterreich",
    "Tulln": "Niederösterreich",
    "Hohenems": "Vorarlberg",
    "Spittal an der Drau": "Kärnten",
    "Telfs": "Tirol",
    "Ternitz": "Niederösterreich",
    "Perchtoldsdorf": "Niederösterreich",
    "Feldkirchen in Kärnten": "Kärnten",
    "Bludenz": "Vorarlberg",
    "Bad Ischl": "Oberösterreich"
};

// CSV headers
const headers = [
    "Title",
    "FirstName",
    "LastName",
    "Email",
    "Phone",
    "Street",
    "ZipCode",
    "City",
    "State",
    "Link",
    "fullNameAndTitle"
];

// Function to extract title, first name, and last name from fullNameAndTitle
function extractName(fullNameAndTitle) {
    const fullNameAndTitleSplitted = fullNameAndTitle.split(' ');

    const title = fullNameAndTitleSplitted.slice(0, -2).join(' ').trim();
    const lastName = fullNameAndTitleSplitted.slice(-2, -1).join('')
    const firstName = fullNameAndTitleSplitted.slice(-1).join('')

    return { title, lastName, firstName };
}

// Function to format the address fields
function formatAddress(address) {
    const addressParts = address.split(", ");
    const [zipCodeAndCity, street] = addressParts
    const [zipCode, city] = zipCodeAndCity.split(' ');

    const formattedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    const state = cityToStateMap[formattedCity] || '-';

    return { street, zipCode, city, state };
}

// Build CSV string
let csv = headers.join(",") + "\n";

data.forEach((item, index) => {
    const { title, firstName, lastName } = extractName(item.fullNameAndTitle);
    const { street, zipCode, city, state } = formatAddress(item.address);

    const row = [
        title,
        firstName,
        lastName,
        item.email,
        item.phoneNumber,
        street,
        zipCode,
        city,
        state,
        item.link,
        item.fullNameAndTitle
    ];

    // Check if the row already exists in the CSV
    const isDuplicate = csv.includes(row.join(","));
    if (!isDuplicate) {
        csv += row.join(",") + "\n";
    }
});

fs.writeFile('./table.csv', csv, (err) => {
    if (err) throw err;
    console.log('CSV file saved!');
});