import 'dotenv/config';
import axios from 'axios';
import { Entity } from '../models/dah';


const loginUrl = `${process.env.SERVICE_URL}/auth/login`;
const baseUrl = `${process.env.SERVICE_URL}/item/ca_entities/id/`;
const entityUrl = `${process.env.SERVICE_URL}/find/ca_entities`;
const objectUrl = `${process.env.SERVICE_URL}/find/ca_objects`;

export async function collectDah() {
    const skipped = [];

    const tokenResponse = await axios.get(loginUrl, {
        params: {
            'usr': process.env.API_USER_NAME,
            'pwd': process.env.API_USER_PW
        }

    });
    const token = tokenResponse.data.authToken

    //// Fetch items form Collective Access API - example for the item type "entity"

    // Get the IDs of all entities

    const entitiesResponse = await axios.get(entityUrl, {
        params: {
          'q': '*',
          'authToken': token
        }
    });
    const entitiyIds = entitiesResponse.data.results.map(e => e.id)
    
    const objectsResponse = await axios.get(objectUrl, {
        params: {
            'q': '*',
            'authToken': token
        }
    });
    const objectIds = objectsResponse.data.results.map(e => e.id)

    // Fetch the entities
        
    let entities = []
    let index = 0

    while(index < entitiyIds.length ) {
        const en = await fetchSingleEntity(index)
        if(!en) { break }
        entities.push(en)
        index ++
    };
    async function  fetchSingleEntity (i) {
        const url = baseUrl + entitiyIds[i]
        const entity = await axios.get(url, {
            params: {
                'authToken': token
            }
        })
        // Example for a specific mapping of the api data to a custom data model for entitity
        let en = {
            name: entity.data.idno.value,
            id: entity.data.entity_id.value,
            nameSort: entity.data.idno_sort.value
        }
        return entity
        ? en
        : undefined
    }

    // Write in Monogo DB Collection

    for (const restEntity of entities) {
        try {
            const entity = await Entity.findOneAndUpdate(
                { id: restEntity.id },
                restEntity,
                {
                    upsert: true,
                    new: true,
                    runValidators: true
                }
            );

        } catch (error) {
            skipped.push({
                entity: restEntity,
                entityId: restEntity.id,
                error
            });
        }
    }    
}


