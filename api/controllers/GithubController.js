/**
 * GithubController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    getInfoGithub: async function (req, res) {
        return res.status(200).json({ status: true, message: 'success getting data', list: [1, 2, 3] })

    },

    saveFavorite: async function (req, res) {

        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ status: false, message: 'No Params body' })
        }
        const storage = require('node-persist');


        let listFavorites = await storage.getItem('lisFavorites');
        // if doesn't exist the list
        if (!listFavorites) {
            let listTemp = [];
            listTemp.push(name);
            await storage.setItem('lisFavorites', JSON.stringify(listTemp))
            listFavorites = JSON.parse(await storage.getItem('lisFavorites'));
            return res.status(200).json({ status: true, message: 'success saving data', favorites: listFavorites });
        }
        else {
            listFavorites = JSON.parse(await storage.getItem('lisFavorites'));
            if(listFavorites.includes(name)){
                return res.status(200).json({ status: true, message: 'success saving data', favorites: listFavorites });
            }
            //if name does'n exist
            listFavorites.push(name);
            await storage.setItem('lisFavorites', JSON.stringify(listFavorites))
            listFavorites = JSON.parse(await storage.getItem('lisFavorites'));
            return res.status(200).json({ status: true, message: 'success saving data', favorites: listFavorites })

        }


        return res.status(500).json({ status: false, message: 'Errro getting favorits', favorites: [] })
    }

};

