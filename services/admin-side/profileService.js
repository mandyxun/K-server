/** 
let admin_profiles = [
    {'id':'admin001',
     'image': "image",
     'email':'admin.001@gmail.com',
     'password':'1234567',
     'name':'周小红',
     'eName':'Abi',
     'timeZone':'北京时间'
    },
     {'id':'admin002',
     'image':'image',
     'email':'admin.002@gmail.com',
     'password':'1234567',
     'name':'周小黄',
     'eName':'Andy',
     'timeZone':'北京时间'
    },
    {'id':'admin003',
     'image':'image',
     'email':'admin.003@gmail.com',
     'password':'1234567',
     'name':'周小白',
     'eName':'Sandy',
     'timeZone':'北京时间'
    }
];
*/

const AdminProfileModel = require('../../models/adminProfileModel');

const getProfiles = function() {
    // return new Promise((resolve, reject) =>{
    //     resolve(admin_profiles);
    // });

    //connect to mongoDB
    return new Promise((resolve, reject) => {
        AdminProfileModel.find({}, function(err, admin_profiles) {
            if (err) {
                reject(err);
            } else {
                resolve(admin_profiles);
            }
        });
    });
}

const getProfile = function(id) {
    // return new Promise((resolve, reject) =>{
    //     resolve(admin_profiles.find(profile => profile.id ===id));
    // });

    return new Promise((resolve, reject) => {
        AdminProfileModel.findOne({id: id}, function(err, admin_profile) {
            if (err) {
                reject(err);
            } else {
                resolve(admin_profile);
            }
        });
    });
}

const addProfile = function(newProfile) {
    // return new Promise((resolve, reject) =>{
    //     if (admin_profiles.find(profile => profile.name === newProfile.name)) {
    //         reject('admin name already exists');
    //     } else {
    //         newProfile.id = `admin${admin_profiles.length + 1}`;
    //         admin_profiles.push(newProfile);
    //         resolve(newProfile);
    //     }

    // });

    return new Promise((resolve, reject) => {
        AdminProfileModel.findOne({name: newProfile.name}, function(err, data) {
            if (data) {
                reject('Admin name already exists');
            } else {
                AdminProfileModel.count({}, function(err, num) {
                    newProfile.id = `admin${num  + 1}`;
                    let mongoProfile = new AdminProfileModel(newProfile);
                    mongoProfile.save();
                    resolve(mongoProfile);
                });
            }
        });
    })
}

module.exports = {
    getProfiles,
    getProfile,
    addProfile
}