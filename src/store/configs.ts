export type MousePosition = {
    x: number
    y: number
}

export type WindowDimension = {
    width: number
    height: number
}

type ConfigType = {
    id: string;
    icon: string;
    userID: number
    position: MousePosition
    dimensions: WindowDimension

}
type PublicConfigType = Omit<ConfigType, 'userID'>


export class Config {
    private configs: ConfigType[] = []
    static DEFAULT_CONFIG: Partial<ConfigType> = {
        position: { x: 0, y: 0 },
        dimensions: { width: 0, height: 0 }
    }

    toPublicConfig(config: ConfigType): PublicConfigType {
        return {
            id: config.id,
            icon: config.icon,
            dimensions: config.dimensions,
            position: config.position
        }

    }

    findConfigByUserId(id: number) {
        const finder = this.configs.filter(config => config.userID === id).map(this.toPublicConfig) ?? []

        return finder
    }
    findConfigByID(id: ConfigType['id']) {
        const finder = this.configs.find(config => config.id === id) ?? null

        if (finder) return this.toPublicConfig(finder)
    }
    updateConfig(newConfig: ConfigType) {
        const config = this.findConfigByID(newConfig.id)

        if (!config) {
            return null
        }

        this.configs = this.configs.map(i => {
            if (i.id === newConfig.id) return { ...i, ...newConfig }
            return i
        })

    }

    createConfig(userID: number, config: ConfigType) {
        config.userID = userID

        this.configs.push(config)

        return this.toPublicConfig(config)
    }

}
export const configStore = new Config()