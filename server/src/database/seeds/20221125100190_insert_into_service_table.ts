import { Knex } from 'knex';

const TABLE_NAME = 'service';

/**
 * Delete existing entries and seed values for service.
 *
 */
export function seed(knex: Knex) {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          name: 'Ncell',
          type: 'TOP UP',
          user_id: 1,
          description: 'Balance top up for Ncell',
          logo: '/services/topup/ncell.png'
        },
        {
          name: 'Namaste',
          type: 'TOP UP',
          user_id: 1,
          description: 'Balance top up for Namaste',
          logo: '/services/topup/ntc.jpg'
        },
        {
          name: 'Smart Cell',
          type: 'TOP UP',
          user_id: 1,
          description: 'Balance top up for Smart Cell',
          logo: '/services/topup/smart-cell.jpg'
        },
        {
          name: 'Netflix',
          type: 'ENTERTAINMENT',
          user_id: 1,
          description: 'Netflix subscription',
          logo: '/services/entertainment/netflix.png'
        },
        {
          name: 'Spotify',
          type: 'ENTERTAINMENT',
          user_id: 1,
          description: 'Spotify subscription',
          logo: '/services/entertainment/spotify.png'
        },
        {
          name: 'Hulu',
          type: 'ENTERTAINMENT',
          user_id: 1,
          description: 'Hulu subscription',
          logo: '/services/entertainment/hulu.jpg'
        },
        {
          name: 'NetTV',
          type: 'ENTERTAINMENT',
          user_id: 1,
          description: 'NetTV subscription',
          logo: '/services/entertainment/nettv.jpg'
        },
        {
          name: 'Daami',
          type: 'ENTERTAINMENT',
          user_id: 1,
          description: 'Daami subscription',
          logo: '/services/entertainment/daami.jpg'
        },
        {
          name: 'Foodmandu',
          type: 'FOOD',
          user_id: 1,
          description: 'Food from Foodmandu',
          logo: '/services/food/foodmandu.jpg'
        },
        {
          name: 'Bhojdeals',
          type: 'FOOD',
          user_id: 1,
          description: 'Food from Bhojdeals',
          logo: '/services/food/bhojdeals.png'
        },
        {
          name: 'Khaanpin',
          type: 'FOOD',
          user_id: 1,
          description: 'Food from Khaanpin',
          logo: '/services/food/khaanpin.jpg'
        },
        {
          name: 'Sasto Deal',
          type: 'ONLINE SHOPPING',
          user_id: 1,
          description: 'Online shopping from Sasto Deal',
          logo: '/services/online-shopping/sasto-deal.jpg'
        },
        {
          name: 'Daraz',
          type: 'ONLINE SHOPPING',
          user_id: 1,
          description: 'Online shopping from Daraz',
          logo: '/services/online-shopping/daraz.png'
        },
        {
          name: 'Gyapu',
          type: 'ONLINE SHOPPING',
          user_id: 1,
          description: 'Online shopping from Gyapu',
          logo: '/services/online-shopping/gyapu.png'
        },
        {
          name: 'SmartDoko',
          type: 'ONLINE SHOPPING',
          user_id: 1,
          description: 'Online shopping from SmartDoko',
          logo: '/services/online-shopping/smartdoko.png'
        }
      ]);
    });
}
