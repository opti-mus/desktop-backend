export const configs = []

export function toPublicConfig(config) {
    return {
        id: config.id
    }
}

export function findConfigById(id) {
    return configs.find(config => config.id === id) ?? null
}
export function updateConfig(id, newConfig) {
    const config = findConfigById(Number(id))

    if (!config) {
        return null
    }

    config.config = newConfig
    return config
}

export function createConfig({ userID, config }) {
    const newConfig = {
        id: userID,
        config
    }
    const isExist = findConfigById(userID)

    if (isExist) return isExist

    configs.push(newConfig)
    return newConfig
}
