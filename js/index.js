document.addEventListener("DOMContentLoaded",function(){
    for(const area in AreaData.getAll()){
        Icon.getArea(area).incetance = new AreaList()
        for(const category in IconData.getCategory()){
            Icon.getArea(area).incetance.append(new (Icon.getArea(area))(category,Icon.getCategory(category)))
        }
        Icon.getArea(area).incetance.createElements()
    }
    Icon.getArea("iconAreaList").incetance.createIcon()
})

class AreaList{
    constructor(){
        this.areaList = []
    }

    append(area){
        this.areaList.push(area)
    }

    createElements(){
        this.areaList.forEach(area => area.createElement())
    }

    setItemList(){
        this.areaList.forEach(area => area.setDivList())
    }

    createIconDivList(){
        this.areaList.forEach(area => area.createIconDivList())
    }

    createIcon(){
        this.setItemList()
        this.createIconDivList()
    }
}

class CategoryArea{
    constructor(htmlClass, category){
        this.classname = htmlClass
    }

    createElement(){
        const div = document.createElement("div")
        // div.classList.add("category-area")
        // div.classList.add(`${this.classname}Area`)
        div.classList.add(`${this.classname}-area`)
        div.classList.add("area")
        document.body.append(div)
    }
}

class BarArea{
    constructor(htmlClass,category){
        this.classname = htmlClass
        this.barColor = category.barColor
        this.text = category.text
    }

    createElement(){
        const div = document.createElement("div")
        div.classList.add("area-bar")
        div.classList.add(this.barColor)
        div.textContent = this.text
        // document.querySelector(`.${this.classname}Area`).append(div)
        document.querySelector(`.${this.classname}-area`).append(div)
    }
}

class IconListArea{
    constructor(htmlClass, category){
        this.classname = htmlClass
        this.iconDivList = new IconDivList(htmlClass)
    }

    createIcon(){
        this.setDivList()
        this.createIconDivList()
    }

    createElement(){
        const div = document.createElement("div")
        div.classList.add("icon-area")
        div.classList.add(this.classname)
        // document.querySelector(`.${this.classname}Area`).append(div)
        document.querySelector(`.${this.classname}-area`).append(div)
    }

    setDivList(){
        Icon.getElement(this.classname).forEach(item => this.iconDivList.append(item))
    }

    createIconDivList(){
        this.iconDivList.createElement()
    }
}

class IconDivList{
    constructor(htmlClass){
        this.classname = htmlClass
        this.items = []
    }

    append(item){
        this.items.push(new IconDiv(item))
    }

    createElement(){
        this.items.forEach(item => item.createElement())
    }
}

class IconItem{
    constructor(item){
        this.item = item
    }
}

class IconDiv extends IconItem{
    createElement(){
        const itemDiv = document.createElement("div")
        itemDiv.classList.add(this.item.classname)
        document.querySelector(`.${this.item.parentClass}`).append(itemDiv)

        new IconAnchor(this.item).createElement()
    }
}

class IconAnchor extends IconItem{
    createElement(){
        const element = document.createElement("a")
        element.setAttribute("href",this.item.href)
        element.setAttribute("target","_blank")
        document.querySelector(`.${this.item.classname}`).append(element)
        
        new IconImg(this.item).createElement()
    }
}

class IconImg extends IconItem{
    createElement(){
        const element = document.createElement("img")
        element.setAttribute("src",this.item.img)
        element.classList.add("icon")
        document.querySelector(`.${this.item.classname} a`).append(element)
    }
}

class Icon{
    static getArea(key){
        return AreaData.getAll()[key]
    }

    static getCategory(key){
        return IconData.getCategory()[key]
    }

    static getElement(parentClass){
        return IconData.GetEement().filter(item => item.parentClass === parentClass)
    }
}

class AreaData{
    static getAll(){
        return {
            categoryArea:CategoryArea,
            barArea:BarArea,
            iconAreaList:IconListArea,
        }
    }
}

