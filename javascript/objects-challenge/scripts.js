const elizabethSinger = {
    congressionalDistrict: "Nashville",
    platformStatements: {
        taxes: "Taxes are lame but we need money",
        jobs: "Jobs are good",
        infrastructure: "We need it",
        healthcare: "Gotta get healthier, folks",
        crimeAndEnforcement: "Good police officers who do their job"
    },
    donationURL: "https//www.wikipedia.org",
    calendarOfEvents:  [
        {
            date: "11/26/2018",
            time: "5:00 pm",
            name: "Eat a donut",
            purpose: "To eat a donut with Elizabeth Singer"
        },
        {
            date: "11/27/2018",
            time: "4:00 pm",
            name: "Give money to Elizabeth",
            purpose: "Allow Elizabeth to have more money for her campaign"
        },
        {
            date: "11/27/2018",
            time: "4:00 am",
            name: "Questions with Elizabeth",
            purpose: "Ask any questions you want to Elizabeth"
        }
    ],
    volunteerInformation: [
        {
            name: "Bill",
            address: "Across the way",
            email: "bill@gmail.com",
            phoneNumber: "111-111-1111",
            availability: "always",
            duties: "Answering phone calls"
        },
        {
            name: "Mary",
            address: "In Nashville",
            email: "mary@gmail.com",
            phoneNumber: "111-111-1111",
            availability: "always",
            duties: "Fundraising"
        },
        {
            name: "Jerry",
            address: "Not answering",
            email: "jerry@gmail.com",
            phoneNumber: "111-111-1111",
            availability: "never",
            duties: "Being on the volunteer list"
        }
    ],
    biography: "Elizabeth Singer was born to lead. After being raised by coyotes in the mountains of East Tennessee, she grew to lead them herself. Then she moved to Nashville to become a congresswoman.",
    imageGallery: [
        "https://upload.wikimedia.org/wikipedia/commons/7/7d/Marie_Antoinette_by_Joseph_Ducreux.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/b/b2/The_Royal_Family_of_France_in_1781_by_an_anonymous_artist.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Josef_Hauzinger_002.jpg/330px-Josef_Hauzinger_002.jpg"
    ],
    missionStatement: "To put meat on the table for Nashville",
    votingURL: "https://www.google.com"
}


// Below are the functions used to change the existing property values or to add new sub-properties depending on the property

function changeDistrict(newDistrict) {
    elizabethSinger.congressionalDistrict = newDistrict;
}

function changePlatform(topic, newPlatformStatement) {
    elizabethSinger.platformStatements[topic] = newPlatformStatement;
}

function changeDonationURL(newDonationURL) {
    elizabethSinger.donationURL = newDonationURL;
}

function addToCalendarofEvents(dateEntry, timeEntry, nameEntry, purposeEntry) {
    elizabethSinger.calendarOfEvents.push({
        date: dateEntry,
        time: timeEntry,
        name: nameEntry,
        purpose: purposeEntry,
    })
}

function addToVolunteerList(nameEntry, addressEntry, emailEntry, phoneEntry, availEntry, dutiesEntry) {
    elizabethSinger.volunteerInformation.push({
        name: nameEntry,
        address: addressEntry,
        email: emailEntry,
        phoneNumber: phoneEntry,
        availability: availEntry,
        duties: dutiesEntry
    })
}

function changeBiography(newBiography) {
    elizabethSinger.biography = newBiography;
}

function addImageToGallery (newImageURL) {
    elizabethSinger.imageGallery += newImageURL;
}

function changeMissionStatement (newStatement) {
    elizabethSinger.missionStatement = newStatement;
}

function newVotingURL (newURL) {
    elizabethSinger.votingURL = newURL;
}
