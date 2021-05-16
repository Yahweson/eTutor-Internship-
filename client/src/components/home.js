import React, {Component} from 'react';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            patients: []
        }
    } 

    componentDidMount(){
        
    }

    render() {
        return (
            <div>
                <section>
                    <h2>Home</h2>    
                    <div id="MagicCarousel" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#MagicCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#MagicCarousel" data-slide-to="1" ></li>
                            <li data-target="#MagicCarousel" data-slide-to="2" ></li>
                            <li data-target="#MagicCarousel" data-slide-to="3" ></li>
                        </ol>
                        
                        <div className="carousel-inner" role="listbox">
                            
                            <div className="carousel-item active">
                                <img className="d-block w-100" src="../img/1.jpg" alt="First Slide"/>
                                <div className="carousel-caption">
                                    <h3>Precautions</h3>
                                    <p>First Slide</p>
                                </div>
                            </div>
                        

                            <div className="carousel-item">
                                <img className="d-block w-100" src="../img/2.jpg" alt="Second Slide"/>
                                <div className="carousel-caption">
                                    <h3>Precautions</h3>
                                    <p>Second Slide</p>
                                </div>
                            </div>

                            <div className="carousel-item">
                                <img className="d-block w-100" src="../img/3.jpg" alt="First Slide"/>
                                <div className="carousel-caption">
                                    <h3>Precautions</h3>
                                    <p>Third Slide</p>
                                </div>
                            </div>

                            <div className="carousel-item">
                                <img className="d-block w-100" src="../img/4.jpg" alt="Fourth Slide"/>
                                <div className="carousel-caption">
                                    <h3>Precautions</h3>
                                    <p>Fourth Slide</p>
                                </div>
                            </div>
                        
                            <a href="#MagicCarousel" className="carousel-control-prev" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon"></span>
                                <span className="sr-only">Previous</span>
                            </a>

                            <a href="#MagicCarousel" className="carousel-control-next" role="button" data-slide="next">
                                <span className="carousel-control-next-icon"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>   
                </section>
            </div>
          );
    }

}

export default Home;
